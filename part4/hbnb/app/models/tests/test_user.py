import unittest

from app.models.user import User


class TestUserModel(unittest.TestCase):
    def test_user_creation(self):
        user = User(
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            password="secret123",
        )

        self.assertEqual(user.first_name, "John")
        self.assertEqual(user.last_name, "Doe")
        self.assertEqual(user.email, "john.doe@example.com")
        self.assertFalse(user.is_admin)
        self.assertIsNone(user.profile_photo_url)

    def test_password_hash_and_verify(self):
        user = User(
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            password="secret123",
        )

        user.hash_password("secret123")

        self.assertNotEqual(user.password, "secret123")
        self.assertTrue(user.verify_password("secret123"))
