import os
from datetime import datetime, timezone

from flask import current_app, request
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from flask_restx import Namespace, Resource, fields
from app.services import facade
from app.utils.image_uploads import (
    delete_uploaded_internal_file,
    save_uploaded_image_file,
    validate_uploaded_image_file,
)

api = Namespace('users', description='User operations')

# Define the user model for input validation and documentation
user_model = api.model('User', {
    'first_name': fields.String(required=True, description='First name of the user'),
    'last_name': fields.String(required=True, description='Last name of the user'),
    'email': fields.String(required=True, description='Email of the user'),
    'password': fields.String(required=True, description='Password for the user')
})

self_update_model = api.model('UserSelfUpdate', {
    'first_name': fields.String(required=False, description='Updated first name'),
    'last_name': fields.String(required=False, description='Updated last name'),
})

user_photo_model = api.model('UserPhotoUpload', {
    'photo': fields.String(description='Multipart uploaded profile image'),
})


def normalize_allowed_extensions(extensions):
    normalized = set()
    for extension in extensions:
        value = str(extension).lower().strip()
        if value == "jpeg":
            value = "jpg"
        if value:
            normalized.add(value)
    return normalized


def get_profile_upload_dir():
    configured_dir = current_app.config.get("USER_PROFILE_UPLOAD_DIR")
    if configured_dir:
        return configured_dir
    return os.path.join(
        current_app.root_path,
        current_app.config["USER_PROFILE_UPLOAD_SUBDIR"],
    )


def get_place_upload_dir():
    configured_dir = current_app.config.get("PLACE_IMAGE_UPLOAD_DIR")
    if configured_dir:
        return configured_dir
    return os.path.join(
        current_app.root_path,
        current_app.config["PLACE_IMAGE_UPLOAD_SUBDIR"],
    )


def collect_user_owned_place_image_urls(user):
    image_urls = []
    for place in getattr(user, "places", []) or []:
        for photo in getattr(place, "photos", []) or []:
            if getattr(photo, "image_url", None):
                image_urls.append(photo.image_url)
        if getattr(place, "image_url", None):
            image_urls.append(place.image_url)
    return list(dict.fromkeys(image_urls))


def delete_user_owned_place_images(image_urls):
    if not image_urls:
        return
    upload_dir = get_place_upload_dir()
    url_prefix = current_app.config["PLACE_IMAGE_URL_PREFIX"]
    for image_url in image_urls:
        try:
            delete_uploaded_internal_file(
                image_url,
                url_prefix=url_prefix,
                upload_dir=upload_dir,
            )
        except OSError:
            continue


def validate_profile_photo(photo_file):
    return validate_uploaded_image_file(
        photo_file,
        allowed_extensions=normalize_allowed_extensions(
            current_app.config["ALLOWED_USER_PROFILE_IMAGE_EXTENSIONS"]
        ),
        max_size=current_app.config["USER_PROFILE_IMAGE_MAX_SIZE"],
        invalid_extension_message="Profile photo must use JPG, JPEG, PNG, or WEBP.",
        invalid_content_message="Uploaded profile photo content is invalid.",
        max_size_message="Profile photo must be 3 MB or smaller.",
    )


@api.route('/')
class UserList(Resource):
    @api.expect(user_model, validate=True)
    @api.response(201, 'User successfully created')
    @api.response(400, 'Email already registered')
    @api.response(400, 'Invalid input data')
    @api.response(403, 'Admin privileges required')
    @jwt_required()
    def post(self):
        """Register a new user (admin only)"""
        current_user = get_jwt()
        
        # Check if user is an admin
        if not current_user.get('is_admin', False):
            return {'error': 'Admin privileges required'}, 403
        
        user_data = api.payload

        # Simulate email uniqueness check (to be replaced by real validation with persistence)
        existing_user = facade.get_user_by_email(user_data['email'])
        if existing_user:
            return {'error': 'Email already registered'}, 400
        try:
            new_user = facade.create_user(user_data)
        except (ValueError, TypeError) as e:
            return {'error': str(e)}, 400

        return {'id': new_user.id, 'first_name': new_user.first_name, 'last_name': new_user.last_name, 'email': new_user.email}, 201


@api.route('/me')
class CurrentUserResource(Resource):
    @api.response(200, 'Current user retrieved successfully')
    @api.response(401, 'Authentication required')
    @api.response(404, 'User not found')
    @jwt_required()
    def get(self):
        """Get the currently authenticated user"""
        user = facade.get_user(get_jwt_identity())
        if not user:
            return {'error': 'User not found'}, 404
        return user.to_dict(), 200

    @api.expect(self_update_model, validate=True)
    @api.response(200, 'Current user updated successfully')
    @api.response(400, 'Invalid input data')
    @api.response(401, 'Authentication required')
    @api.response(404, 'User not found')
    @jwt_required()
    def put(self):
        """Update the current user's basic profile"""
        user_id = get_jwt_identity()
        user = facade.get_user(user_id)
        if not user:
            return {'error': 'User not found'}, 404

        user_data = api.payload or {}
        allowed_fields = {'first_name', 'last_name'}
        unexpected_fields = set(user_data.keys()) - allowed_fields
        if unexpected_fields:
            return {'error': 'Only first_name and last_name can be updated'}, 400

        update_data = {key: value for key, value in user_data.items() if key in allowed_fields}
        if not update_data:
            return {'error': 'No profile fields provided'}, 400

        try:
            updated_user = facade.update_user(user_id, update_data)
        except (ValueError, TypeError) as error:
            return {'error': str(error)}, 400

        return updated_user.to_dict(), 200

    @api.response(200, "Current user deleted successfully")
    @api.response(401, "Authentication required")
    @api.response(403, "Admin account deletion is not allowed")
    @api.response(404, "User not found")
    @jwt_required()
    def delete(self):
        """Delete the current user's account and owned uploaded files"""
        user_id = get_jwt_identity()
        user = facade.get_user(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        if user.is_admin:
            return {'error': 'Admin account deletion is not allowed from this endpoint'}, 403

        profile_photo_url = user.profile_photo_url
        place_image_urls = collect_user_owned_place_image_urls(user)
        deleted_user = facade.delete_user(user_id)
        if not deleted_user:
            return {'error': 'User not found'}, 404

        upload_dir = get_profile_upload_dir()
        url_prefix = current_app.config["USER_PROFILE_IMAGE_URL_PREFIX"]
        if profile_photo_url:
            try:
                delete_uploaded_internal_file(
                    profile_photo_url,
                    url_prefix=url_prefix,
                    upload_dir=upload_dir,
                )
            except OSError:
                pass
        delete_user_owned_place_images(place_image_urls)

        return {
            "message": "Account deleted successfully.",
            "deleted_user_id": user_id,
        }, 200


@api.route("/me/export")
class CurrentUserExportResource(Resource):
    @api.response(200, "Current user data export generated successfully")
    @api.response(401, "Authentication required")
    @api.response(404, "User not found")
    @jwt_required()
    def get(self):
        """Export current user's personal data in JSON format"""
        user_id = get_jwt_identity()
        user = facade.get_user(user_id)
        if not user:
            return {'error': 'User not found'}, 404

        places = [place.to_dict() for place in facade.get_places_by_owner_id(user_id)]
        reviews = [review.to_dict() for review in facade.get_reviews_by_user_id(user_id)]
        return {
            "exported_at": datetime.now(timezone.utc).isoformat(),
            "user": user.to_dict(),
            "places": places,
            "reviews": reviews,
        }, 200


@api.route('/me/photo')
class CurrentUserPhotoResource(Resource):
    @api.expect(user_photo_model, validate=False)
    @api.response(200, 'Current user photo updated successfully')
    @api.response(400, 'Invalid uploaded photo')
    @api.response(401, 'Authentication required')
    @api.response(404, 'User not found')
    @jwt_required()
    def post(self):
        """Upload or replace the current user's profile photo"""
        user_id = get_jwt_identity()
        user = facade.get_user(user_id)
        if not user:
            return {'error': 'User not found'}, 404

        photo = request.files.get("photo")
        if not photo or not photo.filename:
            return {
                "error": "Profile photo is required.",
                "fields": {"photo": "Profile photo is required."},
            }, 400

        upload_dir = get_profile_upload_dir()
        url_prefix = current_app.config["USER_PROFILE_IMAGE_URL_PREFIX"]
        previous_photo_url = user.profile_photo_url
        saved_photo_url = None

        try:
            extension = validate_profile_photo(photo)
            saved_photo_url = save_uploaded_image_file(
                photo,
                upload_dir=upload_dir,
                url_prefix=url_prefix,
                extension=extension,
            )
            facade.update_user(user_id, {"profile_photo_url": saved_photo_url})
            updated_user = facade.get_user(user_id)

            if previous_photo_url and previous_photo_url != saved_photo_url:
                delete_uploaded_internal_file(
                    previous_photo_url,
                    url_prefix=url_prefix,
                    upload_dir=upload_dir,
                )

            return updated_user.to_dict(), 200
        except ValueError as error:
            if saved_photo_url:
                delete_uploaded_internal_file(
                    saved_photo_url,
                    url_prefix=url_prefix,
                    upload_dir=upload_dir,
                )
            return {"error": str(error), "fields": {"photo": str(error)}}, 400
        except TypeError as error:
            if saved_photo_url:
                delete_uploaded_internal_file(
                    saved_photo_url,
                    url_prefix=url_prefix,
                    upload_dir=upload_dir,
                )
            return {"error": str(error)}, 400

    @api.response(200, 'Current user photo removed successfully')
    @api.response(401, 'Authentication required')
    @api.response(404, 'User not found')
    @jwt_required()
    def delete(self):
        """Remove the current user's profile photo"""
        user_id = get_jwt_identity()
        user = facade.get_user(user_id)
        if not user:
            return {'error': 'User not found'}, 404

        upload_dir = get_profile_upload_dir()
        url_prefix = current_app.config["USER_PROFILE_IMAGE_URL_PREFIX"]
        if user.profile_photo_url:
            delete_uploaded_internal_file(
                user.profile_photo_url,
                url_prefix=url_prefix,
                upload_dir=upload_dir,
            )
        facade.update_user(user_id, {"profile_photo_url": None})
        updated_user = facade.get_user(user_id)
        return updated_user.to_dict(), 200


@api.route('/me/places')
class CurrentUserPlacesResource(Resource):
    @api.response(200, 'Current user places retrieved successfully')
    @api.response(401, 'Authentication required')
    @api.response(404, 'User not found')
    @jwt_required()
    def get(self):
        """Get all places owned by the currently authenticated user"""
        user = facade.get_user(get_jwt_identity())
        if not user:
            return {'error': 'User not found'}, 404

        places = facade.get_places_by_owner_id(user.id)
        return [place.to_dict() for place in places], 200


@api.route('/<user_id>')
class UserResource(Resource):
    @api.response(200, 'User details retrieved successfully')
    @api.response(404, 'User not found')
    def get(self, user_id):
        """Get user details by ID"""
        user = facade.get_user(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        return {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email}, 200
    
    @api.response(200, 'User updated successfully')
    @api.response(400, 'Invalid input data')
    @api.response(403, 'Admin privileges required')
    @api.response(404, 'User not found')
    @jwt_required()
    def put(self, user_id):
        """Update user details by ID (admin only)"""
        current_user = get_jwt()
        
        # Check if user is an admin
        if not current_user.get('is_admin', False):
            return {'error': 'Admin privileges required'}, 403
        
        user = facade.get_user(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        
        user_data = dict(api.payload or {})
        email = user_data.get('email')
        new_password = user_data.pop('password', None)

        # Ensure email uniqueness (if email is being updated)
        if email:
            existing_user = facade.get_user_by_email(email)
            if existing_user and existing_user.id != user_id:
                return {'error': 'Email already in use'}, 400

        if new_password is not None:
            new_password = str(new_password).strip()
            if not new_password:
                return {'error': 'Password cannot be empty'}, 400
            user.hash_password(new_password)
        
        try:
            updated_user = facade.update_user(user_id, user_data)
        except (ValueError, TypeError) as e:
            return {'error': str(e)}, 400
        return {'id': updated_user.id, 'first_name': updated_user.first_name, 'last_name': updated_user.last_name, 'email': updated_user.email}, 200
