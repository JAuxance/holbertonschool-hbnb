import json

from sqlalchemy import inspect, text

from app.extensions import db


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
