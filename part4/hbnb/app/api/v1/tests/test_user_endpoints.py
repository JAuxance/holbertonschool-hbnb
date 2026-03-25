from tests_utils import APITestCase


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
