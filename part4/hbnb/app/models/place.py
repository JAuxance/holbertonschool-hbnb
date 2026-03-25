import re

from .base_model import BaseModel
from sqlalchemy.orm import validates
from sqlalchemy import Column, String, ForeignKey, Float, Text
from sqlalchemy.orm import relationship, synonym
from app.extensions import db
from app.utils.phone_countries import get_phone_country

place_amenity = db.Table('place_amenity',
    Column('place_id', String(36), db.ForeignKey('places.id'), primary_key=True),
    Column('amenity_id', String(36), db.ForeignKey('amenities.id'), primary_key=True)
)

class Place(BaseModel):
    __tablename__ = 'places'

    title = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)
    price = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    image_url = Column(String(255), nullable=True)
    phone_number = Column(String(40), nullable=True)
    phone_country_iso = Column(String(2), nullable=True)
    custom_amenities_raw = Column(Text, nullable=True)
    user_id = Column(String(36), ForeignKey('users.id'), nullable=False)
    # Keep owner_id as an alias to preserve existing API and service compatibility.
    owner_id = synonym('user_id')

    owner = relationship('User', back_populates='places')
    reviews = relationship('Review', back_populates='place', cascade='all, delete-orphan')
    amenities = relationship('Amenity', secondary=place_amenity, back_populates='places')
    photos = relationship(
        'PlacePhoto',
        back_populates='place',
        cascade='all, delete-orphan',
        order_by='PlacePhoto.position',
    )

    def __init__(
        self,
        title,
        description,
        price,
        latitude,
        longitude,
        owner,
        image_url=None,
        phone_number=None,
        phone_country_iso=None,
    ):
        """Initialize a Place instance."""
        super().__init__()
        self.title = title
        self.description = description
        self.price = price
        self.latitude = latitude
        self.longitude = longitude
        self.owner = owner
        self.image_url = image_url
        self.phone_number = phone_number
        self.phone_country_iso = phone_country_iso

    @validates('title')
    def validate_title(self, key, value):
        """Validate the title of the place."""
        if not isinstance(value, str):
            raise TypeError("Title must be a string")
        value = value.strip()
        if not value:
            raise ValueError("Title cannot be empty")
        if len(value) > 100:
            raise ValueError("Title cannot exceed 100 characters")
        return value

    @validates('description')
    def validate_description(self, key, value):
        """Validate the description of the place."""
        if not isinstance(value, str):
            raise TypeError("Description must be a string")
        if not value.strip():
            value = ""
        return value.strip()

    @validates('price')
    def validate_price(self, key, value):
        """Validate the price of the place."""
        if not isinstance(value, (int, float)):
            raise TypeError("Price must be a number")
        if value < 0:
            raise ValueError("Price cannot be negative")
        if value > 9_999_999:
            raise ValueError("Price cannot exceed 7 digits")
        return float(value)

    @validates('latitude')
    def validate_latitude(self, key, value):
        """Validate the latitude of the place."""
        if not isinstance(value, (int, float)):
            raise TypeError("Latitude must be a number")
        if value < -90 or value > 90:
            raise ValueError("Latitude must be between -90 and 90")
        return float(value)

    @validates('longitude')
    def validate_longitude(self, key, value):
        """Validate the longitude of the place."""
        if not isinstance(value, (int, float)):
            raise TypeError("Longitude must be a number")
        if value < -180 or value > 180:
            raise ValueError("Longitude must be between -180 and 180")
        return float(value)

    @validates('phone_number')
    def validate_phone_number(self, key, value):
        """Validate the optional phone number."""
        if value is None:
            return None
        if not isinstance(value, str):
            raise TypeError("Phone number must be a string")
        value = value.strip()
        if not value:
            return None
        if len(value) > 16:
            raise ValueError("Phone number must be 16 characters or less")
        if not re.fullmatch(r"\+\d{6,15}", value):
            raise ValueError("Phone number must use the international format starting with +")
        return value

    @validates('phone_country_iso')
    def validate_phone_country_iso(self, key, value):
        if value is None:
            return None
        if not isinstance(value, str):
            raise TypeError("Phone country must be a string")
        value = value.strip().upper()
        if not value:
            return None
        if len(value) != 2:
            raise ValueError("Phone country must use a 2-letter ISO code")
        if not get_phone_country(value):
            raise ValueError("Phone country is not supported")
        return value

    def set_photo_urls(self, photo_urls):
        from .place_photo import PlacePhoto

        self.photos.clear()
        normalized_urls = []
        for index, image_url in enumerate(photo_urls or []):
            if not image_url:
                continue
            normalized_urls.append(image_url)
            self.photos.append(PlacePhoto(image_url=image_url, position=index))

        self.image_url = normalized_urls[0] if normalized_urls else None

    def get_primary_image_url(self):
        ordered_photos = sorted(self.photos, key=lambda photo: photo.position)
        if ordered_photos:
            return ordered_photos[0].image_url
        return self.image_url

    def add_review(self, review):
        """Add a review to the place."""
        self.reviews.append(review)

    def add_amenity(self, amenity):
        """Add an amenity to the place."""
        self.amenities.append(amenity)

    def to_dict(self):
        """Convert the Place instance to a dictionary."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'image_url': self.get_primary_image_url(),
            'phone_number': self.phone_number,
            'phone_country_iso': self.phone_country_iso,
            'custom_amenities': [],
            'owner_id': self.owner_id,
            'amenities': [amenity.to_dict() for amenity in self.amenities],
            'photos': [photo.to_dict() for photo in sorted(self.photos, key=lambda item: item.position)],
        }
