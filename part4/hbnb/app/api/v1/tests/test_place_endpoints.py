import io
import json

from app.bootstrap import migrate_place_custom_amenities
from app.extensions import db
from app.models.place import Place
from tests_utils import APITestCase


class TestPlaceEndpoints(APITestCase):
    def test_create_place_requires_authentication(self):
        response = self.client.post(
            "/api/v1/places/",
            json={
                "title": "Blocked Place",
                "description": "Not logged in",
                "price": 50.0,
                "latitude": 48.8566,
                "longitude": 2.3522,
                "amenities": [],
            },
        )

        self.assertEqual(response.status_code, 401)

    def test_create_place_uses_authenticated_owner(self):
        user_response, token, _, _ = self.create_and_login_user(
            first_name="Alice",
            last_name="Smith",
        )
        user_id = user_response.get_json()["id"]

        response = self.client.post(
            "/api/v1/places/",
            json={
                "title": "Nice Place",
                "description": "A nice place",
                "price": 50.0,
                "latitude": 48.8566,
                "longitude": 2.3522,
                "owner_id": "ignored-value",
            },
            headers=self.auth_headers(token),
        )

        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data["title"], "Nice Place")
        self.assertEqual(data["owner_id"], user_id)

    def test_create_place_with_amenities(self):
        _, token, _, _ = self.create_and_login_user()
        amenity_response, name = self.create_amenity(name="Sauna")
        amenity_id = amenity_response.get_json()["id"]

        response = self.create_place(token, amenities=[amenity_id])

        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(len(data["amenities"]), 1)
        self.assertEqual(data["amenities"][0]["id"], amenity_id)
        self.assertEqual(data["amenities"][0]["name"], name)

    def test_create_place_with_phone_number(self):
        _, token, _, _ = self.create_and_login_user()

        response = self.create_place(
            token,
            phone_number="+33612345678",
        )

        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data["phone_number"], "+33612345678")
        self.assertEqual(data["custom_amenities"], [])

    def test_create_place_rejects_non_normalized_phone_number(self):
        _, token, _, _ = self.create_and_login_user()

        response = self.create_place(
            token,
            phone_number="+33 6 12 34 56 78",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("Phone number", response.get_json()["error"])

    def test_create_place_with_uploaded_image(self):
        _, token, _, _ = self.create_and_login_user()
        amenity_response, _ = self.create_amenity(name="Fire pit", token=token)
        amenity_id = amenity_response.get_json()["id"]

        response = self.client.post(
            "/api/v1/places/",
            data={
                "title": "Image Place",
                "description": "With upload",
                "price": "120",
                "latitude": "48.8566",
                "longitude": "2.3522",
                "phone_number": "+33140000000",
                "amenities": [amenity_id],
                "image": (io.BytesIO(b"fake-image-data"), "place.jpg"),
            },
            headers=self.auth_headers(token),
            content_type="multipart/form-data",
        )

        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertIn("image_url", data)
        self.assertTrue(data["image_url"].startswith("/static/uploads/places/"))
        self.assertEqual(data["phone_number"], "+33140000000")
        self.assertEqual([item["id"] for item in data["amenities"]], [amenity_id])

    def test_create_place_rejects_invalid_image_extension(self):
        _, token, _, _ = self.create_and_login_user()

        response = self.client.post(
            "/api/v1/places/",
            data={
                "title": "Bad Image Place",
                "description": "Bad upload",
                "price": "120",
                "latitude": "48.8566",
                "longitude": "2.3522",
                "image": (io.BytesIO(b"fake-image-data"), "place.exe"),
            },
            headers=self.auth_headers(token),
            content_type="multipart/form-data",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_create_place_invalid_data(self):
        _, token, _, _ = self.create_and_login_user()

        response = self.create_place(
            token,
            title="",
            price=-10,
            latitude=100.0,
            longitude=200.0,
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_get_all_places(self):
        _, token, _, _ = self.create_and_login_user()
        self.create_place(token, title="Place A")
        self.create_place(token, title="Place B")

        response = self.client.get("/api/v1/places/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 2)

    def test_get_place(self):
        _, token, _, _ = self.create_and_login_user()
        created = self.create_place(
            token,
            phone_number="+33610101010",
        )
        place_id = created.get_json()["id"]

        response = self.client.get(f"/api/v1/places/{place_id}")

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["id"], place_id)
        self.assertEqual(data["title"], "Nice Place")
        self.assertEqual(data["phone_number"], "+33610101010")
        self.assertEqual(data["custom_amenities"], [])

    def test_legacy_custom_amenities_are_migrated_to_real_amenities(self):
        _, token, _, _ = self.create_and_login_user()
        created = self.create_place(token)
        place_id = created.get_json()["id"]

        with self.app.app_context():
            place = db.session.get(Place, place_id)
            place.custom_amenities_raw = json.dumps(["Hammock", "Outdoor shower", "hammock"])
            db.session.commit()

            migrated_places = migrate_place_custom_amenities()
            db.session.refresh(place)

        self.assertEqual(migrated_places, 1)
        response = self.client.get(f"/api/v1/places/{place_id}")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["custom_amenities"], [])
        amenity_names = sorted(item["name"] for item in data["amenities"])
        self.assertEqual(amenity_names, ["Hammock", "Outdoor shower"])

    def test_owner_can_update_place(self):
        _, token, _, _ = self.create_and_login_user()
        created = self.create_place(token)
        place_id = created.get_json()["id"]

        response = self.client.put(
            f"/api/v1/places/{place_id}",
            json={
                "title": "Updated Place",
                "description": "Updated description",
                "price": 75.0,
                "latitude": 48.8566,
                "longitude": 2.3522,
                "amenities": [],
            },
            headers=self.auth_headers(token),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["title"], "Updated Place")

    def test_non_owner_cannot_update_place(self):
        _, owner_token, _, _ = self.create_and_login_user()
        _, other_token, _, _ = self.create_and_login_user()
        created = self.create_place(owner_token)
        place_id = created.get_json()["id"]

        response = self.client.put(
            f"/api/v1/places/{place_id}",
            json={
                "title": "Blocked",
                "description": "No access",
                "price": 75.0,
                "latitude": 48.8566,
                "longitude": 2.3522,
                "amenities": [],
            },
            headers=self.auth_headers(other_token),
        )

        self.assertEqual(response.status_code, 403)

    def test_admin_can_update_any_place(self):
        _, owner_token, _, _ = self.create_and_login_user()
        created = self.create_place(owner_token)
        place_id = created.get_json()["id"]

        response = self.client.put(
            f"/api/v1/places/{place_id}",
            json={
                "title": "Admin Updated",
                "description": "Admin override",
                "price": 99.0,
                "latitude": 48.8566,
                "longitude": 2.3522,
                "amenities": [],
            },
            headers=self.auth_headers(self.get_admin_token()),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["title"], "Admin Updated")

    def test_owner_can_delete_place(self):
        _, token, _, _ = self.create_and_login_user()
        created = self.create_place(token)
        place_id = created.get_json()["id"]

        response = self.client.delete(
            f"/api/v1/places/{place_id}",
            headers=self.auth_headers(token),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            self.client.get(f"/api/v1/places/{place_id}").status_code,
            404,
        )

    def test_non_owner_cannot_delete_place(self):
        _, owner_token, _, _ = self.create_and_login_user()
        _, other_token, _, _ = self.create_and_login_user()
        created = self.create_place(owner_token)
        place_id = created.get_json()["id"]

        response = self.client.delete(
            f"/api/v1/places/{place_id}",
            headers=self.auth_headers(other_token),
        )

        self.assertEqual(response.status_code, 403)

    def test_admin_can_delete_any_place(self):
        _, owner_token, _, _ = self.create_and_login_user()
        created = self.create_place(owner_token)
        place_id = created.get_json()["id"]

        response = self.client.delete(
            f"/api/v1/places/{place_id}",
            headers=self.auth_headers(self.get_admin_token()),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            self.client.get(f"/api/v1/places/{place_id}").status_code,
            404,
        )
