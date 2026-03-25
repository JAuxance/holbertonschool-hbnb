from tests_utils import APITestCase


class TestAmenityEndpoints(APITestCase):
    def test_authenticated_user_can_create_amenity(self):
        _, token, _, _ = self.create_and_login_user()
        response, name = self.create_amenity(name="Wi-Fi", token=token)

        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertIn("id", data)
        self.assertEqual(data["name"], name)

    def test_create_amenity_requires_authentication(self):
        response = self.client.post(
            "/api/v1/amenities/",
            json={"name": "Private Pool"},
        )

        self.assertEqual(response.status_code, 401)

    def test_create_amenity_reuses_existing_name_case_insensitively(self):
        _, token, _, _ = self.create_and_login_user()
        created, _ = self.create_amenity(name="Private Pool", token=token)

        response = self.client.post(
            "/api/v1/amenities/",
            json={"name": "  private pool  "},
            headers=self.auth_headers(token),
        )

        self.assertEqual(created.status_code, 201)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["id"], created.get_json()["id"])

    def test_create_amenity_invalid_data(self):
        _, token, _, _ = self.create_and_login_user()
        response = self.client.post(
            "/api/v1/amenities/",
            json={"name": ""},
            headers=self.auth_headers(token),
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_get_all_amenities(self):
        self.create_amenity(name="Wi-Fi")
        self.create_amenity(name="Pool")

        response = self.client.get("/api/v1/amenities/")

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data["amenities"]), 2)

    def test_get_amenity(self):
        created, name = self.create_amenity(name="Parking")
        amenity_id = created.get_json()["id"]

        response = self.client.get(f"/api/v1/amenities/{amenity_id}")

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["id"], amenity_id)
        self.assertEqual(data["name"], name)

    def test_update_amenity(self):
        created, _ = self.create_amenity(name="Parking")
        amenity_id = created.get_json()["id"]

        response = self.client.put(
            f"/api/v1/amenities/{amenity_id}",
            json={"name": "Covered Parking"},
            headers=self.auth_headers(self.get_admin_token()),
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["name"], "Covered Parking")
