import unittest

from app.models.place import Place
from app.models.review import Review
from app.models.user import User


class TestPlaceModel(unittest.TestCase):
    def test_place_creation_and_relationships(self):
        owner = User(
            first_name="Alice",
            last_name="Smith",
            email="alice.smith@example.com",
            password="secret123",
        )
        place = Place(
            title="Cozy Apartment",
            description="A nice place to stay",
            price=100,
            latitude=37.7749,
            longitude=-122.4194,
            owner=owner,
        )
        review = Review(text="Great stay!", rating=5, place=place, user=owner)

        self.assertEqual(place.title, "Cozy Apartment")
        self.assertEqual(place.price, 100.0)
        self.assertEqual(len(place.reviews), 1)
        self.assertEqual(place.reviews[0].text, "Great stay!")
        self.assertEqual(place.owner.email, "alice.smith@example.com")
        self.assertIs(review.place, place)

    def test_place_validates_price(self):
        owner = User(
            first_name="Alice",
            last_name="Smith",
            email="alice.smith@example.com",
            password="secret123",
        )

        with self.assertRaises(ValueError):
            Place(
                title="Cozy Apartment",
                description="A nice place to stay",
                price=-1,
                latitude=37.7749,
                longitude=-122.4194,
                owner=owner,
            )
