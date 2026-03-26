from app import create_app
from app.bootstrap import (
    ensure_place_columns,
    ensure_user_columns,
    migrate_place_custom_amenities,
    migrate_place_images_to_gallery,
    cleanup_non_admin_profile_photos_once,
)
from app.services import facade
from app.extensions import db

app = create_app()


def init_admin_user():
    """Create the default admin user in the DB if it doesn't exist."""
    admin = facade.ensure_admin_user('admin@hbnb.io', 'admin1234')
    print(f"Admin user ready: {admin.email} (id={admin.id})")


with app.app_context():
    # Ensure all tables exist, then bootstrap the admin user.
    db.create_all()
    updated_columns = ensure_place_columns()
    if updated_columns:
        print(f"Database schema updated: added places.{', places.'.join(updated_columns)}")
    updated_user_columns = ensure_user_columns()
    if updated_user_columns:
        print(f"Database schema updated: added users.{', users.'.join(updated_user_columns)}")
    migrated_places = migrate_place_custom_amenities()
    if migrated_places:
        print(f"Migrated legacy custom amenities on {migrated_places} place(s)")
    migrated_photo_places = migrate_place_images_to_gallery()
    if migrated_photo_places:
        print(f"Migrated legacy place images on {migrated_photo_places} place(s)")
    cleanup_report = cleanup_non_admin_profile_photos_once()
    if cleanup_report["ran"]:
        print(
            "Legacy profile photo cleanup completed: "
            f"{cleanup_report['cleared_users']} non-admin account(s) reset, "
            f"{cleanup_report['removed_files']} file(s) removed"
        )
    init_admin_user()


if __name__ == '__main__':
    app.run(debug=app.config.get("DEBUG", False))
