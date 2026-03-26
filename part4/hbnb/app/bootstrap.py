import json
import os

from flask import current_app
from sqlalchemy import inspect, text

from app.extensions import db
from app.utils.image_uploads import delete_uploaded_internal_file


def ensure_place_columns():
    """Add place columns to older SQLite databases when they are missing."""
    inspector = inspect(db.engine)
    if "places" not in inspector.get_table_names():
        return []

    columns = {column["name"] for column in inspector.get_columns("places")}
    additions = {
        "image_url": "ALTER TABLE places ADD COLUMN image_url VARCHAR(255)",
        "phone_number": "ALTER TABLE places ADD COLUMN phone_number VARCHAR(40)",
        "phone_country_iso": "ALTER TABLE places ADD COLUMN phone_country_iso VARCHAR(2)",
        "custom_amenities_raw": "ALTER TABLE places ADD COLUMN custom_amenities_raw TEXT",
    }

    updated_columns = []
    for column_name, statement in additions.items():
        if column_name in columns:
            continue
        db.session.execute(text(statement))
        updated_columns.append(column_name)

    if updated_columns:
        db.session.commit()

    return updated_columns


def ensure_user_columns():
    """Add user columns to older SQLite databases when they are missing."""
    inspector = inspect(db.engine)
    if "users" not in inspector.get_table_names():
        return []

    columns = {column["name"] for column in inspector.get_columns("users")}
    additions = {
        "profile_photo_url": "ALTER TABLE users ADD COLUMN profile_photo_url VARCHAR(255)",
    }

    updated_columns = []
    for column_name, statement in additions.items():
        if column_name in columns:
            continue
        db.session.execute(text(statement))
        updated_columns.append(column_name)

    if updated_columns:
        db.session.commit()

    return updated_columns


def ensure_bootstrap_flags_table():
    db.session.execute(text(
        """
        CREATE TABLE IF NOT EXISTS app_bootstrap_flags (
            flag_key VARCHAR(120) PRIMARY KEY,
            value VARCHAR(255),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """
    ))
    db.session.commit()


def get_bootstrap_flag(flag_key):
    row = db.session.execute(
        text("SELECT value FROM app_bootstrap_flags WHERE flag_key = :flag_key"),
        {"flag_key": flag_key},
    ).first()
    return row[0] if row else None


def set_bootstrap_flag(flag_key, value="1"):
    existing = db.session.execute(
        text("SELECT flag_key FROM app_bootstrap_flags WHERE flag_key = :flag_key"),
        {"flag_key": flag_key},
    ).first()
    if existing:
        db.session.execute(
            text(
                """
                UPDATE app_bootstrap_flags
                SET value = :value, updated_at = CURRENT_TIMESTAMP
                WHERE flag_key = :flag_key
                """
            ),
            {"flag_key": flag_key, "value": value},
        )
    else:
        db.session.execute(
            text("INSERT INTO app_bootstrap_flags (flag_key, value) VALUES (:flag_key, :value)"),
            {"flag_key": flag_key, "value": value},
        )
    db.session.commit()


def get_user_profile_upload_dir():
    configured_dir = current_app.config.get("USER_PROFILE_UPLOAD_DIR")
    if configured_dir:
        return configured_dir
    return os.path.join(
        current_app.root_path,
        current_app.config["USER_PROFILE_UPLOAD_SUBDIR"],
    )


def cleanup_non_admin_profile_photos_once():
    """
    Clear stored profile photos for existing non-admin accounts exactly once.

    This cleanup is deliberately one-shot to avoid erasing avatars that users upload later.
    """
    from app.models.user import User

    flag_key = "cleanup_non_admin_profile_photos_v1"
    ensure_bootstrap_flags_table()
    if get_bootstrap_flag(flag_key):
        return {"ran": False, "cleared_users": 0, "removed_files": 0}

    cleared_users = 0
    removed_files = 0
    upload_dir = get_user_profile_upload_dir()
    url_prefix = current_app.config["USER_PROFILE_IMAGE_URL_PREFIX"]

    users = User.query.filter(User.is_admin.is_(False), User.profile_photo_url.isnot(None)).all()
    for user in users:
        if user.profile_photo_url:
            delete_uploaded_internal_file(
                user.profile_photo_url,
                url_prefix=url_prefix,
                upload_dir=upload_dir,
            )
            removed_files += 1
        user.profile_photo_url = None
        cleared_users += 1

    if cleared_users:
        db.session.commit()

    set_bootstrap_flag(flag_key, "done")
    return {"ran": True, "cleared_users": cleared_users, "removed_files": removed_files}


def migrate_place_custom_amenities():
    """Move legacy per-place custom amenities into the global amenities catalog."""
    from app.models.amenity import Amenity
    from app.models.place import Place

    places = Place.query.filter(Place.custom_amenities_raw.isnot(None)).all()
    migrated_places = 0

    for place in places:
        try:
            raw_items = json.loads(place.custom_amenities_raw or "[]")
        except (TypeError, ValueError):
            raw_items = []

        if not isinstance(raw_items, list):
            raw_items = []

        normalized_items = []
        seen_names = set()
        for raw_item in raw_items:
            if not isinstance(raw_item, str):
                continue
            item = raw_item.strip()
            if not item:
                continue
            lowered = item.lower()
            if lowered in seen_names:
                continue
            seen_names.add(lowered)
            normalized_items.append(item)

        changed = False
        existing_place_amenities = {amenity.name.strip().lower() for amenity in place.amenities}

        for item in normalized_items:
            lowered = item.lower()
            if lowered in existing_place_amenities:
                changed = True
                continue

            amenity = Amenity.query.filter(db.func.lower(Amenity.name) == lowered).first()
            if amenity is None:
                amenity = Amenity(name=item)
                db.session.add(amenity)
                db.session.flush()

            place.amenities.append(amenity)
            existing_place_amenities.add(lowered)
            changed = True

        if place.custom_amenities_raw:
            place.custom_amenities_raw = None
            changed = True

        if changed:
            migrated_places += 1

    if migrated_places:
        db.session.commit()

    return migrated_places


def migrate_place_images_to_gallery():
    """Ensure legacy places with a single image_url also have a gallery entry."""
    from app.models.place import Place
    from app.models.place_photo import PlacePhoto

    places = Place.query.all()
    migrated_places = 0

    for place in places:
        ordered_photos = sorted(place.photos, key=lambda photo: photo.position)

        if ordered_photos and not place.image_url:
            place.image_url = ordered_photos[0].image_url
            migrated_places += 1
            continue

        if place.image_url and not ordered_photos:
            place.photos.append(PlacePhoto(image_url=place.image_url, position=0))
            migrated_places += 1

    if migrated_places:
        db.session.commit()

    return migrated_places
