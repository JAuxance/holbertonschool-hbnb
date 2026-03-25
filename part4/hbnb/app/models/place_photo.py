from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, validates

from .base_model import BaseModel


class PlacePhoto(BaseModel):
    __tablename__ = "place_photos"

    place_id = Column(String(36), ForeignKey("places.id"), nullable=False)
    image_url = Column(String(255), nullable=False)
    position = Column(Integer, nullable=False, default=0)

    place = relationship("Place", back_populates="photos")

    def __init__(self, image_url, position=0):
        super().__init__()
        self.image_url = image_url
        self.position = position

    @validates("image_url")
    def validate_image_url(self, key, value):
        if not isinstance(value, str):
            raise TypeError("Image URL must be a string")
        value = value.strip()
        if not value:
            raise ValueError("Image URL cannot be empty")
        if len(value) > 255:
            raise ValueError("Image URL must be 255 characters or less")
        return value

    @validates("position")
    def validate_position(self, key, value):
        if not isinstance(value, int):
            raise TypeError("Photo position must be an integer")
        if value < 0:
            raise ValueError("Photo position cannot be negative")
        return value

    def to_dict(self):
        return {
            "id": self.id,
            "image_url": self.image_url,
            "position": self.position,
        }
