from app.models.amenity import Amenity
from app.persistence.repository import SQLAlchemyRepository
from sqlalchemy import func

class AmenityRepository(SQLAlchemyRepository):
    def __init__(self):
        super().__init__(Amenity)

    def get_amenity_by_name(self, name):
        """Get an amenity by its name."""
        normalized_name = str(name or "").strip().lower()
        if not normalized_name:
            return None
        return self.model.query.filter(func.lower(self.model.name) == normalized_name).first()

    def get_amenities_by_place_id(self, place_id):
        """Get all amenities for a specific place."""
        from app.extensions import db
        from app.models.place import Place
        place = db.session.get(Place, place_id)
        if place:
            return place.amenities
        return []
