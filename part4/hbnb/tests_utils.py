import os
import shutil
import tempfile
import unittest
import uuid

from app import create_app
from app.extensions import db
from app.services import facade


class APITestCase(unittest.TestCase):
    admin_email = "admin@hbnb.io"
    admin_password = "admin1234"

    def setUp(self):
        fd, self.db_path = tempfile.mkstemp(suffix=".db")
        os.close(fd)
        self.upload_dir = tempfile.mkdtemp(prefix="hbnb-place-images-")
        self.user_upload_dir = tempfile.mkdtemp(prefix="hbnb-user-images-")

        self.app = create_app(
            "config.TestingConfig",
            config_overrides={
                "SQLALCHEMY_DATABASE_URI": f"sqlite:///{self.db_path}",
                "SECRET_KEY": "test-secret-key-for-hbnb-part4-1234567890",
                "JWT_SECRET_KEY": "test-jwt-secret-key-for-hbnb-part4-1234567890",
                "PLACE_IMAGE_UPLOAD_DIR": self.upload_dir,
                "USER_PROFILE_UPLOAD_DIR": self.user_upload_dir,
            },
        )
        self.client = self.app.test_client()

        with self.app.app_context():
            db.drop_all()
            db.create_all()
            facade.ensure_admin_user(self.admin_email, self.admin_password)
            db.session.remove()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()
            db.engine.dispose()

        if os.path.exists(self.db_path):
            os.unlink(self.db_path)

        shutil.rmtree(self.upload_dir, ignore_errors=True)
        shutil.rmtree(self.user_upload_dir, ignore_errors=True)

    def auth_headers(self, token):
        return {"Authorization": f"Bearer {token}"}

    def login(self, email, password):
        return self.client.post(
            "/api/v1/auth/login",
            json={"email": email, "password": password},
        )

    def get_token(self, email, password):
        response = self.login(email, password)
        self.assertEqual(response.status_code, 200, response.get_json())
        return response.get_json()["access_token"]

    def get_admin_token(self):
        return self.get_token(self.admin_email, self.admin_password)

    def create_user(
        self,
        *,
        first_name="Jane",
        last_name="Doe",
        email=None,
        password="secret123",
        token=None,
    ):
        if email is None:
            email = f"{uuid.uuid4().hex[:8]}@example.com"

        response = self.client.post(
            "/api/v1/users/",
            json={
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password,
            },
            headers=self.auth_headers(token or self.get_admin_token()),
        )
        return response, email, password

    def signup_user(
        self,
        *,
        first_name="Jane",
        last_name="Doe",
        email=None,
        password="secret123",
    ):
        if email is None:
            email = f"{uuid.uuid4().hex[:8]}@example.com"

        response = self.client.post(
            "/api/v1/auth/signup",
            json={
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password,
            },
        )
        return response, email, password

    def create_and_login_user(self, **kwargs):
        response, email, password = self.create_user(**kwargs)
        self.assertEqual(response.status_code, 201, response.get_json())
        token = self.get_token(email, password)
        return response, token, email, password

    def signup_and_login_user(self, **kwargs):
        response, email, password = self.signup_user(**kwargs)
        self.assertEqual(response.status_code, 201, response.get_json())
        token = self.get_token(email, password)
        return response, token, email, password

    def create_amenity(self, *, name=None, token=None):
        if name is None:
            name = f"Amenity {uuid.uuid4().hex[:8]}"

        response = self.client.post(
            "/api/v1/amenities/",
            json={"name": name},
            headers=self.auth_headers(token or self.get_admin_token()),
        )
        return response, name

    def create_place(
        self,
        token,
        *,
        title="Nice Place",
        description="A nice place",
        price=50.0,
        latitude=48.8566,
        longitude=2.3522,
        phone_number=None,
        phone_country_iso=None,
        amenities=None,
    ):
        response = self.client.post(
            "/api/v1/places/",
            json={
                "title": title,
                "description": description,
                "price": price,
                "latitude": latitude,
                "longitude": longitude,
                "phone_number": phone_number,
                "phone_country_iso": phone_country_iso,
                "amenities": amenities or [],
            },
            headers=self.auth_headers(token),
        )
        return response

    def create_review(self, token, *, place_id, text="Great place!", rating=5):
        response = self.client.post(
            "/api/v1/reviews/",
            json={
                "text": text,
                "rating": rating,
                "place_id": place_id,
            },
            headers=self.auth_headers(token),
        )
        return response
