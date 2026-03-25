from tests_utils import APITestCase


class TestAmenityEndpoints(APITestCase):
    def test_admin_can_create_amenity(self):
        response, name = self.create_amenity(name="Wi-Fi")

        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertIn("id", data)
        self.assertEqual(data["name"], name)

    def test_create_amenity_requires_admin(self):
        _, token, _, _ = self.create_and_login_user(
            first_name="Regular",
            last_name="User",
            email="regular@example.com",
        )

        response, _ = self.create_amenity(name="Private Pool", token=token)

        self.assertEqual(response.status_code, 403)
        self.assertIn("error", response.get_json())

    def test_create_amenity_invalid_data(self):
        response = self.client.post(
            "/api/v1/amenities/",
            json={"name": ""},
            headers=self.auth_headers(self.get_admin_token()),
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
