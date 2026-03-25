import os
import uuid

from flask import current_app, request
from flask_restx import Namespace, Resource, fields
from werkzeug.utils import secure_filename

from app.services import facade
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

api = Namespace('places', description='Place operations')

# Define the models for related entities
amenity_model = api.model('PlaceAmenity', {
    'id': fields.String(description='Amenity ID'),
    'name': fields.String(description='Name of the amenity')
})

user_model = api.model('PlaceUser', {
    'id': fields.String(description='User ID'),
    'first_name': fields.String(description='First name of the owner'),
    'last_name': fields.String(description='Last name of the owner'),
    'email': fields.String(description='Email of the owner')
})

# Define the place model for input validation and documentation
place_model = api.model('Place', {
    'title': fields.String(required=True, description='Title of the place'),
    'description': fields.String(description='Description of the place'),
    'price': fields.Float(required=True, description='Price per night'),
    'latitude': fields.Float(required=True, description='Latitude of the place'),
    'longitude': fields.Float(required=True, description='Longitude of the place'),
    'phone_number': fields.String(description='Phone number for the place host'),
    'amenities': fields.List(fields.String, description="List of amenities ID's"),
})


def allowed_image_file(filename):
    extension = filename.rsplit('.', 1)[-1].lower()
    return (
        '.' in filename
        and extension in current_app.config['ALLOWED_PLACE_IMAGE_EXTENSIONS']
    )


def get_place_upload_dir():
    configured_dir = current_app.config.get('PLACE_IMAGE_UPLOAD_DIR')
    if configured_dir:
        return configured_dir
    return os.path.join(
        current_app.root_path,
        current_app.config['PLACE_IMAGE_UPLOAD_SUBDIR'],
    )


def save_uploaded_place_image(image_file):
    if not image_file or not image_file.filename:
        return None

    filename = secure_filename(image_file.filename)
    if not filename or not allowed_image_file(filename):
        raise ValueError('Invalid image format. Allowed formats: jpg, jpeg, png, webp')

    upload_dir = get_place_upload_dir()
    os.makedirs(upload_dir, exist_ok=True)

    extension = filename.rsplit('.', 1)[-1].lower()
    stored_filename = f"{uuid.uuid4().hex}.{extension}"
    image_file.save(os.path.join(upload_dir, stored_filename))
    return f"{current_app.config['PLACE_IMAGE_URL_PREFIX']}/{stored_filename}"


def delete_uploaded_place_image(image_url):
    if not image_url:
        return

    prefix = current_app.config['PLACE_IMAGE_URL_PREFIX']
    if not image_url.startswith(prefix):
        return

    filename = os.path.basename(image_url)
    if not filename:
        return

    file_path = os.path.join(get_place_upload_dir(), filename)
    if os.path.exists(file_path):
        os.remove(file_path)


def parse_place_payload():
    if request.is_json:
        place_data = dict(api.payload or {})
        place_data['amenities'] = place_data.get('amenities') or []
        place_data['phone_number'] = place_data.get('phone_number') or None
        place_data.pop('custom_amenities', None)
        return place_data

    place_data = {
        'title': request.form.get('title', '').strip(),
        'description': request.form.get('description', '').strip(),
        'price': float(request.form.get('price', 0)),
        'latitude': float(request.form.get('latitude', 0)),
        'longitude': float(request.form.get('longitude', 0)),
        'phone_number': request.form.get('phone_number', '').strip() or None,
        'amenities': request.form.getlist('amenities'),
    }

    image_file = request.files.get('image')
    image_url = save_uploaded_place_image(image_file)
    if image_url:
        place_data['image_url'] = image_url

    return place_data


def validate_place_payload(place_data):
    required_fields = ('title', 'price', 'latitude', 'longitude')
    missing_fields = [field for field in required_fields if field not in place_data]
    if missing_fields:
        raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")


def serialize_place(place, include_owner=False):
    payload = {
        'id': place.id,
        'title': place.title,
        'description': place.description,
        'price': place.price,
        'latitude': place.latitude,
        'longitude': place.longitude,
        'image_url': place.image_url,
        'phone_number': place.phone_number,
        'custom_amenities': [],
        'owner_id': place.owner.id,
        'amenities': [a.to_dict() for a in place.amenities],
    }

    if include_owner:
        payload['owner'] = place.owner.to_dict() if place.owner else None

    return payload


@api.route('/')
class PlaceList(Resource):
    @jwt_required()
    @api.expect(place_model, validate=False)
    @api.response(201, 'Place successfully created')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new place"""
        current_user = get_jwt_identity()  # Get the current user's ID from the JWT token
        try:
            place_data = parse_place_payload()
            validate_place_payload(place_data)
            # Set owner_id from JWT token automatically
            place_data['owner_id'] = current_user
            place = facade.create_place(place_data)
            return serialize_place(place), 201
        except (TypeError, ValueError) as e:
            return {'error': str(e)}, 400

    @api.response(200, 'List of places retrieved successfully')
    def get(self):
        """Retrieve a list of all places"""
        place = facade.get_all_places()
        return [p.to_dict() for p in place], 200


@api.route('/<place_id>')
class PlaceResource(Resource):
    @api.response(200, 'Place details retrieved successfully')
    @api.response(404, 'Place not found')
    def get(self, place_id):
        """Get place details by ID"""
        place = facade.get_place(place_id)
        if not place:
            api.abort(404, "Place not found")
        return serialize_place(place, include_owner=True), 200

    @api.expect(place_model, validate=False)
    @api.response(200, 'Place updated successfully')
    @api.response(403, 'Unauthorized action')
    @api.response(404, 'Place not found')
    @api.response(400, 'Invalid input data')
    @jwt_required()
    def put(self, place_id):
        """Update a place's information"""
        current_user_id = get_jwt_identity()
        current_user = get_jwt()
        
        # Get default values for admin flag
        is_admin = current_user.get('is_admin', False)
        
        existing_place = facade.get_place(place_id)
        if not existing_place:
            api.abort(404, "Place not found")
        
        # Check ownership: allow if admin OR if user is the owner
        if not is_admin and existing_place.owner_id != current_user_id:
            return {'error': 'Unauthorized action'}, 403
        
        try:
            place_data = dict(api.payload or {})
            place_data.pop('custom_amenities', None)
            place = facade.update_place(place_id, place_data)
            if not place:
                api.abort(404, "Place not found")
            return serialize_place(place), 200
        except (TypeError, ValueError) as e:
            return {'error': str(e)}, 400

    @api.response(200, 'Place deleted successfully')
    @api.response(403, 'Unauthorized action')
    @api.response(404, 'Place not found')
    @jwt_required()
    def delete(self, place_id):
        """Delete a place"""
        current_user_id = get_jwt_identity()
        current_user = get_jwt()
        is_admin = current_user.get('is_admin', False)

        existing_place = facade.get_place(place_id)
        if not existing_place:
            api.abort(404, "Place not found")

        if not is_admin and existing_place.owner_id != current_user_id:
            return {'error': 'Unauthorized action'}, 403

        delete_uploaded_place_image(existing_place.image_url)
        facade.delete_place(place_id)
        return {'message': 'Place deleted successfully'}, 200
