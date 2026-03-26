import io
import os

from tests_utils import APITestCase


VALID_JPEG_BYTES = (
    b"\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00"
    b"\x00\x01\x00\x01\x00\x00\xff\xd9"
)


class TestUserEndpoints(APITestCase):
    def test_admin_can_create_user(self):
        response, email, _ = self.create_user(email="jane.doe@example.com")

        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertIn("id", data)
        self.assertEqual(data["first_name"], "Jane")
        self.assertEqual(data["last_name"], "Doe")
        self.assertEqual(data["email"], email)

    def test_create_user_requires_admin_token(self):
        response = self.client.post(
            "/api/v1/users/",
            json={
                "first_name": "Jane",
                "last_name": "Doe",
                "email": "jane.doe@example.com",
                "password": "secret123",
            },
        )

        self.assertEqual(response.status_code, 401)

    def test_create_user_invalid_data(self):
        response = self.client.post(
            "/api/v1/users/",
            json={
                "first_name": "",
                "last_name": "",
                "email": "invalid-email",
                "password": "secret123",
            },
            headers=self.auth_headers(self.get_admin_token()),
        )

        self.assertEqual(response.status_code, 400)

    def test_create_user_duplicate_email(self):
        self.create_user(email="duplicate@example.com")
        response, _, _ = self.create_user(email="duplicate@example.com")

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_get_user(self):
        created, email, _ = self.create_user(email="lookup@example.com")
        user_id = created.get_json()["id"]

        response = self.client.get(f"/api/v1/users/{user_id}")

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["id"], user_id)
        self.assertEqual(data["email"], email)

    def test_get_current_user(self):
        created, token, email, _ = self.signup_and_login_user(
            first_name="Nora",
            last_name="West",
            email="nora@example.com",
        )
        created_user_id = created.get_json()["id"]

        response = self.client.get(
            "/api/v1/users/me",
            headers=self.auth_headers(token),
        )

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["id"], created_user_id)
        self.assertEqual(data["email"], email)
        self.assertEqual(data["first_name"], "Nora")

    def test_current_user_can_update_own_name(self):
        _, token, _, _ = self.signup_and_login_user(
            first_name="Luc",
            last_name="Martin",
            email="luc@example.com",
        )

        response = self.client.put(
            "/api/v1/users/me",
            json={"first_name": "Lucas", "last_name": "Marin"},
            headers=self.auth_headers(token),
        )

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["first_name"], "Lucas")
        self.assertEqual(data["last_name"], "Marin")

    def test_current_user_update_rejects_disallowed_fields(self):
        _, token, _, _ = self.signup_and_login_user(email="blocked-fields@example.com")

        response = self.client.put(
            "/api/v1/users/me",
            json={"email": "new@example.com"},
            headers=self.auth_headers(token),
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_current_user_places_returns_only_owned_places(self):
        _, owner_token, _, _ = self.signup_and_login_user(email="owner@example.com")
        _, other_token, _, _ = self.signup_and_login_user(email="other@example.com")
        self.create_place(owner_token, title="Owner Place 1")
        self.create_place(owner_token, title="Owner Place 2")
        self.create_place(other_token, title="Other Place")

        response = self.client.get(
            "/api/v1/users/me/places",
            headers=self.auth_headers(owner_token),
        )

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data), 2)
        self.assertEqual({place["title"] for place in data}, {"Owner Place 1", "Owner Place 2"})

    def test_update_user_as_admin(self):
        created, _, _ = self.create_user(email="update@example.com")
        user_id = created.get_json()["id"]

        response = self.client.put(
            f"/api/v1/users/{user_id}",
            json={"first_name": "Janet"},
            headers=self.auth_headers(self.get_admin_token()),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["first_name"], "Janet")

    def test_non_admin_cannot_update_user(self):
        created, _, _ = self.create_user(email="admin-created@example.com")
        user_id = created.get_json()["id"]
        _, token, _, _ = self.create_and_login_user(
            first_name="Regular",
            last_name="User",
            email="regular@example.com",
        )

        response = self.client.put(
            f"/api/v1/users/{user_id}",
            json={"first_name": "Blocked"},
            headers=self.auth_headers(token),
        )

        self.assertEqual(response.status_code, 403)

    def test_upload_profile_photo_requires_auth(self):
        response = self.client.post(
            "/api/v1/users/me/photo",
            data={"photo": (io.BytesIO(VALID_JPEG_BYTES), "avatar.jpg")},
            content_type="multipart/form-data",
        )

        self.assertEqual(response.status_code, 401)

    def test_current_user_can_upload_and_delete_profile_photo(self):
        _, token, _, _ = self.signup_and_login_user(email="avatar-owner@example.com")

        upload_response = self.client.post(
            "/api/v1/users/me/photo",
            data={"photo": (io.BytesIO(VALID_JPEG_BYTES), "avatar.jpg")},
            headers=self.auth_headers(token),
            content_type="multipart/form-data",
        )

        self.assertEqual(upload_response.status_code, 200)
        upload_payload = upload_response.get_json()
        self.assertIn("profile_photo_url", upload_payload)
        self.assertTrue(upload_payload["profile_photo_url"].startswith("/static/uploads/users/"))

        delete_response = self.client.delete(
            "/api/v1/users/me/photo",
            headers=self.auth_headers(token),
        )

        self.assertEqual(delete_response.status_code, 200)
        self.assertIsNone(delete_response.get_json()["profile_photo_url"])

    def test_upload_profile_photo_rejects_invalid_extension(self):
        _, token, _, _ = self.signup_and_login_user(email="avatar-invalid-ext@example.com")

        response = self.client.post(
            "/api/v1/users/me/photo",
            data={"photo": (io.BytesIO(VALID_JPEG_BYTES), "avatar.exe")},
            headers=self.auth_headers(token),
            content_type="multipart/form-data",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("photo", response.get_json()["fields"])

    def test_upload_profile_photo_rejects_invalid_content(self):
        _, token, _, _ = self.signup_and_login_user(email="avatar-invalid-content@example.com")

        response = self.client.post(
            "/api/v1/users/me/photo",
            data={"photo": (io.BytesIO(b"not-an-image"), "avatar.jpg")},
            headers=self.auth_headers(token),
            content_type="multipart/form-data",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("photo", response.get_json()["fields"])

    def test_export_current_user_requires_auth(self):
        response = self.client.get("/api/v1/users/me/export")
        self.assertEqual(response.status_code, 401)

    def test_current_user_can_export_personal_data(self):
        _, token, email, _ = self.signup_and_login_user(
            first_name="Export",
            last_name="User",
            email="exporter@example.com",
        )
        _, owner_token, _, _ = self.signup_and_login_user(email="host-owner@example.com")

        own_place_response = self.create_place(token, title="Export Place")
        self.assertEqual(own_place_response.status_code, 201)

        hosted_place_response = self.create_place(owner_token, title="Host Place")
        self.assertEqual(hosted_place_response.status_code, 201)
        hosted_place_id = hosted_place_response.get_json()["id"]

        review_response = self.create_review(token, place_id=hosted_place_id, text="Great host place", rating=5)
        self.assertEqual(review_response.status_code, 201)

        response = self.client.get(
            "/api/v1/users/me/export",
            headers=self.auth_headers(token),
        )

        self.assertEqual(response.status_code, 200)
        payload = response.get_json()
        self.assertEqual(payload["user"]["email"], email)
        self.assertEqual(len(payload["places"]), 1)
        self.assertEqual(payload["places"][0]["title"], "Export Place")
        self.assertEqual(len(payload["reviews"]), 1)
        self.assertEqual(payload["reviews"][0]["text"], "Great host place")
        self.assertIn("exported_at", payload)

    def test_current_user_can_delete_account_and_owned_uploads(self):
        _, token, email, password = self.signup_and_login_user(email="deleter@example.com")

        upload_response = self.client.post(
            "/api/v1/users/me/photo",
            data={"photo": (io.BytesIO(VALID_JPEG_BYTES), "avatar.jpg")},
            headers=self.auth_headers(token),
            content_type="multipart/form-data",
        )
        self.assertEqual(upload_response.status_code, 200)
        profile_photo_url = upload_response.get_json()["profile_photo_url"]
        profile_photo_path = os.path.join(self.user_upload_dir, os.path.basename(profile_photo_url))
        self.assertTrue(os.path.exists(profile_photo_path))

        place_response = self.client.post(
            "/api/v1/places/",
            data={
                "title": "Photo Place",
                "description": "Delete with account",
                "price": "120",
                "latitude": "48.8566",
                "longitude": "2.3522",
                "images": (io.BytesIO(VALID_JPEG_BYTES), "place.jpg"),
            },
            headers=self.auth_headers(token),
            content_type="multipart/form-data",
        )
        self.assertEqual(place_response.status_code, 201)
        place_image_url = place_response.get_json()["image_url"]
        place_image_path = os.path.join(self.upload_dir, os.path.basename(place_image_url))
        self.assertTrue(os.path.exists(place_image_path))

        delete_response = self.client.delete(
            "/api/v1/users/me",
            headers=self.auth_headers(token),
        )
        self.assertEqual(delete_response.status_code, 200)
        self.assertEqual(delete_response.get_json()["message"], "Account deleted successfully.")

        me_response = self.client.get(
            "/api/v1/users/me",
            headers=self.auth_headers(token),
        )
        self.assertEqual(me_response.status_code, 404)

        login_response = self.login(email, password)
        self.assertEqual(login_response.status_code, 401)

        self.assertFalse(os.path.exists(profile_photo_path))
        self.assertFalse(os.path.exists(place_image_path))

    def test_admin_cannot_delete_self_account_from_me_endpoint(self):
        response = self.client.delete(
            "/api/v1/users/me",
            headers=self.auth_headers(self.get_admin_token()),
        )
        self.assertEqual(response.status_code, 403)
