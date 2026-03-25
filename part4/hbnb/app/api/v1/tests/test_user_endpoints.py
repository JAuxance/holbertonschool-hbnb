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
