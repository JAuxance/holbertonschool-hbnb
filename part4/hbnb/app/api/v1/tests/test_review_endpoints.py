from tests_utils import APITestCase


class TestReviewEndpoints(APITestCase):
    def test_create_review(self):
        _, owner_token, _, _ = self.create_and_login_user()
        _, reviewer_token, _, _ = self.create_and_login_user()
        place_response = self.create_place(owner_token)
        place_id = place_response.get_json()["id"]

        response = self.create_review(reviewer_token, place_id=place_id)

        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertIn("id", data)
        self.assertEqual(data["text"], "Great place!")
        self.assertEqual(data["rating"], 5)
        self.assertEqual(data["place_id"], place_id)

    def test_create_review_invalid_rating(self):
        _, owner_token, _, _ = self.create_and_login_user()
        _, reviewer_token, _, _ = self.create_and_login_user()
        place_response = self.create_place(owner_token)
        place_id = place_response.get_json()["id"]

        response = self.create_review(reviewer_token, place_id=place_id, rating=6)

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_owner_cannot_review_own_place(self):
        _, owner_token, _, _ = self.create_and_login_user()
        place_response = self.create_place(owner_token)
        place_id = place_response.get_json()["id"]

        response = self.create_review(owner_token, place_id=place_id)

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_user_cannot_review_same_place_twice(self):
        _, owner_token, _, _ = self.create_and_login_user()
        _, reviewer_token, _, _ = self.create_and_login_user()
        place_response = self.create_place(owner_token)
        place_id = place_response.get_json()["id"]

        self.create_review(reviewer_token, place_id=place_id)
        response = self.create_review(reviewer_token, place_id=place_id, text="Second review")

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_get_reviews(self):
        _, owner_token, _, _ = self.create_and_login_user()
        _, reviewer_token, _, _ = self.create_and_login_user()
        place_response = self.create_place(owner_token)
        place_id = place_response.get_json()["id"]
        self.create_review(reviewer_token, place_id=place_id)

        response = self.client.get("/api/v1/reviews/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 1)

    def test_author_can_update_and_delete_review(self):
        _, owner_token, _, _ = self.create_and_login_user()
        _, reviewer_token, _, _ = self.create_and_login_user()
        place_response = self.create_place(owner_token)
        place_id = place_response.get_json()["id"]
        created = self.create_review(reviewer_token, place_id=place_id)
        review_id = created.get_json()["id"]

        update_response = self.client.put(
            f"/api/v1/reviews/{review_id}",
            json={
                "text": "Updated review text",
                "rating": 4,
                "place_id": place_id,
            },
            headers=self.auth_headers(reviewer_token),
        )
        delete_response = self.client.delete(
            f"/api/v1/reviews/{review_id}",
            headers=self.auth_headers(reviewer_token),
        )

        self.assertEqual(update_response.status_code, 200)
        self.assertEqual(update_response.get_json()["text"], "Updated review text")
        self.assertEqual(delete_response.status_code, 200)

    def test_non_author_cannot_delete_review(self):
        _, owner_token, _, _ = self.create_and_login_user()
        _, reviewer_token, _, _ = self.create_and_login_user()
        _, other_token, _, _ = self.create_and_login_user()
        place_response = self.create_place(owner_token)
        place_id = place_response.get_json()["id"]
        created = self.create_review(reviewer_token, place_id=place_id)
        review_id = created.get_json()["id"]

        response = self.client.delete(
            f"/api/v1/reviews/{review_id}",
            headers=self.auth_headers(other_token),
        )

        self.assertEqual(response.status_code, 403)
