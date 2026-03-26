from tests_utils import APITestCase


class TestAuthEndpoints(APITestCase):
    def test_public_signup_creates_standard_user(self):
        response, email, password = self.signup_user(email="signup@example.com")

        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertIn("id", data)
        self.assertEqual(data["email"], email)
        self.assertFalse(data["is_admin"])
        self.assertNotIn("password", data)

        login_response = self.login(email, password)
        self.assertEqual(login_response.status_code, 200)
        self.assertIn("access_token", login_response.get_json())

    def test_public_signup_rejects_duplicate_email(self):
        self.signup_user(email="duplicate-signup@example.com")
        response, _, _ = self.signup_user(email="duplicate-signup@example.com")

        self.assertEqual(response.status_code, 409)
        self.assertIn("error", response.get_json())

    def test_signup_then_login_can_create_place(self):
        _, token, _, _ = self.signup_and_login_user(email="host@example.com")

        response = self.create_place(token, title="Public Signup Place")

        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data["title"], "Public Signup Place")

    def test_security_headers_are_present_on_api_responses(self):
        response = self.client.get("/api/v1/amenities/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get("X-Content-Type-Options"), "nosniff")
        self.assertEqual(response.headers.get("X-Frame-Options"), "SAMEORIGIN")
        self.assertEqual(
            response.headers.get("Referrer-Policy"),
            "strict-origin-when-cross-origin",
        )
        self.assertIn("geolocation=()", response.headers.get("Permissions-Policy", ""))
