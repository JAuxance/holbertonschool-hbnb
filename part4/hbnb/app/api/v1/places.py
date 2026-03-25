import os
import re
import uuid

from flask import current_app, request
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required
from flask_restx import Namespace, Resource, fields
from werkzeug.utils import secure_filename

from app.services import facade
from app.utils.phone_countries import (
    get_phone_country,
    normalize_phone_country_iso,
    validate_phone_number_for_country,
)

api = Namespace("places", description="Place operations")

amenity_model = api.model("PlaceAmenity", {
    "id": fields.String(description="Amenity ID"),
    "name": fields.String(description="Name of the amenity"),
})

user_model = api.model("PlaceUser", {
    "id": fields.String(description="User ID"),
    "first_name": fields.String(description="First name of the owner"),
    "last_name": fields.String(description="Last name of the owner"),
    "email": fields.String(description="Email of the owner"),
})

place_photo_model = api.model("PlacePhoto", {
    "id": fields.String(description="Photo ID"),
    "image_url": fields.String(description="Photo URL"),
    "position": fields.Integer(description="Gallery position"),
})

place_model = api.model("Place", {
    "title": fields.String(required=True, description="Title of the place"),
    "description": fields.String(description="Description of the place"),
    "price": fields.Float(required=True, description="Price per night"),
    "latitude": fields.Float(required=True, description="Latitude of the place"),
    "longitude": fields.Float(required=True, description="Longitude of the place"),
    "phone_number": fields.String(description="Phone number for the place host"),
    "phone_country_iso": fields.String(description="2-letter ISO country used for phone validation"),
    "amenities": fields.List(fields.String, description="List of amenities IDs"),
})


class PlaceValidationError(ValueError):
    def __init__(self, fields_map, message="Validation failed"):
        super().__init__(message)
        self.fields = fields_map


def validation_response(error):
    return {
        "error": str(error) or "Validation failed",
        "fields": error.fields,
    }, 400


def allowed_image_file(filename):
    extension = filename.rsplit(".", 1)[-1].lower()
    return "." in filename and extension in current_app.config["ALLOWED_PLACE_IMAGE_EXTENSIONS"]


def get_place_upload_dir():
    configured_dir = current_app.config.get("PLACE_IMAGE_UPLOAD_DIR")
    if configured_dir:
        return configured_dir
    return os.path.join(
        current_app.root_path,
        current_app.config["PLACE_IMAGE_UPLOAD_SUBDIR"],
    )


def get_file_size(image_file):
    try:
        stream = image_file.stream
        current_position = stream.tell()
        stream.seek(0, os.SEEK_END)
        size = stream.tell()
        stream.seek(current_position)
        return size
    except (AttributeError, OSError):
        return 0


def validate_uploaded_image_files(image_files):
    if not image_files:
        return []

    cleaned_files = [image_file for image_file in image_files if image_file and image_file.filename]
    fields_map = {}
    max_count = current_app.config["PLACE_IMAGE_MAX_COUNT"]
    max_size = current_app.config["PLACE_IMAGE_MAX_SIZE"]

    if len(cleaned_files) > max_count:
        fields_map["photos"] = f"Add up to {max_count} photos per place."

    for image_file in cleaned_files:
        filename = secure_filename(image_file.filename)
        if not filename or not allowed_image_file(filename):
            fields_map["photos"] = "Photos must use JPG, JPEG, PNG, or WEBP."
            break
        if get_file_size(image_file) > max_size:
            fields_map["photos"] = "Each photo must be 5 MB or smaller."
            break

    if fields_map:
        raise PlaceValidationError(fields_map)

    return cleaned_files


def save_uploaded_place_images(image_files):
    saved_urls = []
    upload_dir = get_place_upload_dir()
    os.makedirs(upload_dir, exist_ok=True)

    for image_file in image_files:
        filename = secure_filename(image_file.filename)
        extension = filename.rsplit(".", 1)[-1].lower()
        stored_filename = f"{uuid.uuid4().hex}.{extension}"
        image_file.save(os.path.join(upload_dir, stored_filename))
        saved_urls.append(f"{current_app.config['PLACE_IMAGE_URL_PREFIX']}/{stored_filename}")

    return saved_urls


def delete_uploaded_place_file(image_url):
    if not image_url:
        return

    prefix = current_app.config["PLACE_IMAGE_URL_PREFIX"]
    if not image_url.startswith(prefix):
        return

    filename = os.path.basename(image_url)
    if not filename:
        return

    file_path = os.path.join(get_place_upload_dir(), filename)
    if os.path.exists(file_path):
        os.remove(file_path)


def delete_uploaded_place_images(image_urls):
    for image_url in {item for item in image_urls if item}:
        delete_uploaded_place_file(image_url)


def collect_place_image_urls(place):
    image_urls = [photo.image_url for photo in getattr(place, "photos", []) if photo.image_url]
    if getattr(place, "image_url", None):
        image_urls.append(place.image_url)
    return list(dict.fromkeys(image_urls))


def parse_place_payload():
    if request.is_json:
        place_data = dict(api.payload or {})
        return place_data, []

    image_files = request.files.getlist("images")
    legacy_image = request.files.get("image")
    if legacy_image and legacy_image.filename:
        image_files.append(legacy_image)

    place_data = {
        "title": request.form.get("title"),
        "description": request.form.get("description"),
        "price": request.form.get("price"),
        "latitude": request.form.get("latitude"),
        "longitude": request.form.get("longitude"),
        "phone_number": request.form.get("phone_number"),
        "phone_country_iso": request.form.get("phone_country_iso"),
        "amenities": request.form.getlist("amenities"),
        "image_url": request.form.get("image_url"),
    }
    return place_data, image_files


def coerce_price(value):
    if isinstance(value, (int, float)):
        return float(value)

    value = str(value).strip()
    if not value:
        raise ValueError("Price is required.")
    if not re.fullmatch(r"\d{1,7}", value):
        raise ValueError("Price must use digits only, up to 7 numbers.")
    return float(value)


def coerce_coordinate(value, *, field_name, min_value, max_value):
    if value is None or (isinstance(value, str) and not value.strip()):
        raise ValueError(f"{field_name} is required.")

    try:
        number = float(value)
    except (TypeError, ValueError) as error:
        raise ValueError(f"{field_name} must be a valid number.") from error

    if number < min_value or number > max_value:
        raise ValueError(f"{field_name} must stay between {min_value} and {max_value}.")

    return number


def normalize_amenity_ids(amenities_value):
    if amenities_value is None:
        return []
    if not isinstance(amenities_value, (list, tuple)):
        raise ValueError("Amenities must be provided as a list.")

    normalized_ids = []
    seen = set()
    for raw_value in amenities_value:
        value = str(raw_value or "").strip()
        if not value or value in seen:
            continue
        seen.add(value)
        normalized_ids.append(value)
    return normalized_ids


def validate_phone_fields(phone_number, phone_country_iso):
    normalized_phone = None
    normalized_country = normalize_phone_country_iso(phone_country_iso)

    if phone_number is None:
        return None, None

    phone_number = str(phone_number).strip()
    if not phone_number:
        return None, None

    if normalized_country:
        validate_phone_number_for_country(phone_number, normalized_country)
        return phone_number, normalized_country

    if not re.fullmatch(r"\+\d{6,15}", phone_number):
        raise ValueError("Phone number must use the international format starting with +.")

    return phone_number, None


def validate_place_payload(place_data, *, partial=False, image_files=None):
    cleaned_data = {}
    fields_map = {}
    image_files = image_files or []

    if not partial or "title" in place_data:
        title = place_data.get("title")
        if title is None or not str(title).strip():
            fields_map["title"] = "Title is required."
        else:
            cleaned_data["title"] = str(title).strip()

    if not partial or "description" in place_data:
        description = place_data.get("description")
        cleaned_data["description"] = "" if description is None else str(description).strip()

    if not partial or "price" in place_data:
        try:
            cleaned_data["price"] = coerce_price(place_data.get("price"))
        except ValueError as error:
            fields_map["price"] = str(error)

    if not partial or "latitude" in place_data:
        try:
            cleaned_data["latitude"] = coerce_coordinate(
                place_data.get("latitude"),
                field_name="Latitude",
                min_value=-90,
                max_value=90,
            )
        except ValueError as error:
            fields_map["latitude"] = str(error)

    if not partial or "longitude" in place_data:
        try:
            cleaned_data["longitude"] = coerce_coordinate(
                place_data.get("longitude"),
                field_name="Longitude",
                min_value=-180,
                max_value=180,
            )
        except ValueError as error:
            fields_map["longitude"] = str(error)

    if not partial or "amenities" in place_data:
        try:
            cleaned_data["amenities"] = normalize_amenity_ids(place_data.get("amenities"))
        except ValueError as error:
            fields_map["amenities"] = str(error)

    if (
        not partial
        or "phone_number" in place_data
        or "phone_country_iso" in place_data
    ):
        phone_number = place_data.get("phone_number")
        phone_country_iso = place_data.get("phone_country_iso")
        if phone_country_iso and not get_phone_country(phone_country_iso):
            fields_map["phone_number"] = "Select a supported country before entering a phone number."
        else:
            try:
                normalized_phone, normalized_country = validate_phone_fields(phone_number, phone_country_iso)
                cleaned_data["phone_number"] = normalized_phone
                cleaned_data["phone_country_iso"] = normalized_country
            except ValueError as error:
                fields_map["phone_number"] = str(error)

    if "image_url" in place_data and place_data.get("image_url"):
        cleaned_data["image_url"] = str(place_data["image_url"]).strip()

    if image_files is not None:
        try:
            cleaned_data["photo_files"] = validate_uploaded_image_files(image_files)
        except PlaceValidationError as error:
            fields_map.update(error.fields)

    if fields_map:
        raise PlaceValidationError(fields_map)

    return cleaned_data


def serialize_place(place, include_owner=False):
    payload = place.to_dict()
    payload["owner_id"] = place.owner.id if place.owner else place.owner_id

    if include_owner:
        payload["owner"] = place.owner.to_dict() if place.owner else None

    return payload


@api.route("/")
class PlaceList(Resource):
    @jwt_required()
    @api.expect(place_model, validate=False)
    @api.response(201, "Place successfully created")
    @api.response(400, "Invalid input data")
    def post(self):
        """Register a new place"""
        current_user = get_jwt_identity()
        saved_urls = []
        try:
            raw_place_data, image_files = parse_place_payload()
            place_data = validate_place_payload(raw_place_data, image_files=image_files)
            if place_data.get("photo_files"):
                saved_urls = save_uploaded_place_images(place_data.pop("photo_files"))
                place_data["photo_urls"] = saved_urls
                place_data["image_url"] = saved_urls[0]

            place_data["owner_id"] = current_user
            place = facade.create_place(place_data)
            return serialize_place(place), 201
        except PlaceValidationError as error:
            delete_uploaded_place_images(saved_urls)
            return validation_response(error)
        except (TypeError, ValueError) as error:
            delete_uploaded_place_images(saved_urls)
            return {"error": str(error)}, 400

    @api.response(200, "List of places retrieved successfully")
    def get(self):
        """Retrieve a list of all places"""
        place = facade.get_all_places()
        return [p.to_dict() for p in place], 200


@api.route("/<place_id>")
class PlaceResource(Resource):
    @api.response(200, "Place details retrieved successfully")
    @api.response(404, "Place not found")
    def get(self, place_id):
        """Get place details by ID"""
        place = facade.get_place(place_id)
        if not place:
            api.abort(404, "Place not found")
        return serialize_place(place, include_owner=True), 200

    @api.expect(place_model, validate=False)
    @api.response(200, "Place updated successfully")
    @api.response(403, "Unauthorized action")
    @api.response(404, "Place not found")
    @api.response(400, "Invalid input data")
    @jwt_required()
    def put(self, place_id):
        """Update a place's information"""
        current_user_id = get_jwt_identity()
        current_user = get_jwt()
        is_admin = current_user.get("is_admin", False)

        existing_place = facade.get_place(place_id)
        if not existing_place:
            api.abort(404, "Place not found")

        if not is_admin and existing_place.owner_id != current_user_id:
            return {"error": "Unauthorized action"}, 403

        existing_image_urls = collect_place_image_urls(existing_place)
        saved_urls = []
        try:
            raw_place_data, image_files = parse_place_payload()
            place_data = validate_place_payload(raw_place_data, partial=True, image_files=image_files)
            if place_data.get("photo_files"):
                saved_urls = save_uploaded_place_images(place_data.pop("photo_files"))
                place_data["photo_urls"] = saved_urls
                place_data["image_url"] = saved_urls[0]

            place = facade.update_place(place_id, place_data)
            if not place:
                api.abort(404, "Place not found")

            if saved_urls:
                delete_uploaded_place_images([
                    image_url for image_url in existing_image_urls
                    if image_url not in saved_urls
                ])

            return serialize_place(place), 200
        except PlaceValidationError as error:
            delete_uploaded_place_images(saved_urls)
            return validation_response(error)
        except (TypeError, ValueError) as error:
            delete_uploaded_place_images(saved_urls)
            return {"error": str(error)}, 400

    @api.response(200, "Place deleted successfully")
    @api.response(403, "Unauthorized action")
    @api.response(404, "Place not found")
    @jwt_required()
    def delete(self, place_id):
        """Delete a place"""
        current_user_id = get_jwt_identity()
        current_user = get_jwt()
        is_admin = current_user.get("is_admin", False)

        existing_place = facade.get_place(place_id)
        if not existing_place:
            api.abort(404, "Place not found")

        if not is_admin and existing_place.owner_id != current_user_id:
            return {"error": "Unauthorized action"}, 403

        image_urls = collect_place_image_urls(existing_place)
        facade.delete_place(place_id)
        delete_uploaded_place_images(image_urls)
        return {"message": "Place deleted successfully"}, 200
