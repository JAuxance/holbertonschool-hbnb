from tests_utils import APITestCase


class TestPlaceEndpoints(APITestCase):
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
        created = self.create_place(token)
        place_id = created.get_json()["id"]

        response = self.client.get(f"/api/v1/places/{place_id}")

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["id"], place_id)
        self.assertEqual(data["title"], "Nice Place")

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
