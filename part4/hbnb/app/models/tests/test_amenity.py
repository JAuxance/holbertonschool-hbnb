import unittest

from app.models.amenity import Amenity


class TestAmenityModel(unittest.TestCase):
    def test_amenity_creation(self):
        amenity = Amenity(name="Wi-Fi")

        self.assertEqual(amenity.name, "Wi-Fi")

    def test_amenity_rejects_blank_name(self):
        with self.assertRaises(ValueError):
            Amenity(name="   ")
