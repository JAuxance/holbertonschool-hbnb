from app.models.user import User
from app.models.amenity import Amenity
from app.models.review import Review
from app.models.place import Place
from app.persistence.user_repository import UserRepository
from app.persistence.review_repository import ReviewRepository
from app.persistence.place_repository import PlaceRepository
from app.persistence.amenity_repository import AmenityRepository


class HBnBFacade:
    def __init__(self):
        self.user_repo = UserRepository()
        self.review_repo = ReviewRepository()
        self.place_repo = PlaceRepository()
        self.amenity_repo = AmenityRepository()

    def create_user(self, user_data):
        existing_user = self.get_user_by_email(user_data['email'])
        if existing_user:
            raise ValueError("Email already registered")

        user = User(**user_data)
        user.hash_password(user_data['password'])
        self.user_repo.add(user)
        return user

    def ensure_admin_user(self, email='admin@hbnb.io', password='admin1234'):
        """Ensure a default admin user exists in the database.

        - If no user with the given email exists, create one with is_admin=True.
        - If it exists, just return it (without changing its password).
        """
        existing_admin = self.get_user_by_email(email)
        if existing_admin:
            return existing_admin

        admin_data = {
            'first_name': 'Admin',
            'last_name': 'User',
            'email': email,
            'password': password,
            'is_admin': True,
        }
        return self.create_user(admin_data)

    def get_user(self, user_id):
        return self.user_repo.get(user_id)

    def get_user_by_email(self, email):
        return self.user_repo.get_user_by_email(email)
    
    def update_user(self, user_id, user_data):
        user = self.get_user(user_id)
        if user:
            self.user_repo.update(user_id, user_data)
        return user

    def create_amenity(self, amenity_data):
        existing_amenity = self.amenity_repo.get_amenity_by_name(amenity_data['name'])
        if existing_amenity:
            raise ValueError("Amenity already exists")

        amenity = Amenity(**amenity_data)
        self.amenity_repo.add(amenity)
        return amenity

    def create_or_get_amenity(self, amenity_data):
        existing_amenity = self.amenity_repo.get_amenity_by_name(amenity_data['name'])
        if existing_amenity:
            return existing_amenity, False

        amenity = Amenity(**amenity_data)
        self.amenity_repo.add(amenity)
        return amenity, True

    def get_amenity(self, amenity_id):
        return self.amenity_repo.get(amenity_id)

    def get_all_amenities(self):
        return self.amenity_repo.get_all()

    def update_amenity(self, amenity_id, amenity_data):
        amenity = self.get_amenity(amenity_id)
        if amenity:
            new_name = amenity_data.get('name')
            if new_name:
                existing_amenity = self.amenity_repo.get_amenity_by_name(new_name)
                if existing_amenity and existing_amenity.id != amenity_id:
                    raise ValueError("Amenity already exists")
            self.amenity_repo.update(amenity_id, amenity_data)
        return amenity

    def create_place(self, place_data):
        owner_id = place_data.get('owner_id')
        owner = self.get_user(owner_id)

        if not owner:
            raise ValueError("Owner with the given ID does not exist")

        amenities = self._resolve_amenities(place_data.get('amenities', []))

        place = Place(
            title=place_data['title'],
            description=place_data.get('description', ''),
            price=place_data['price'],
            latitude=place_data['latitude'],
            longitude=place_data['longitude'],
            owner=owner,
            image_url=place_data.get('image_url'),
            phone_number=place_data.get('phone_number'),
        )

        for amenity in amenities:
            place.add_amenity(amenity)

        self.place_repo.add(place)
        return place

    def get_place(self, place_id):
        return self.place_repo.get(place_id)

    def get_all_places(self):
        return self.place_repo.get_all()

    def get_places_by_owner_id(self, owner_id):
        return self.place_repo.get_places_by_owner_id(owner_id)

    def update_place(self, place_id, place_data):
        place = self.get_place(place_id)
        if not place:
            return None

        update_data = {}
        for key, value in place_data.items():
            if key == 'owner_id':
                owner = self.get_user(value)
                if not owner:
                    raise ValueError("Owner with the given ID does not exist")
                update_data['owner'] = owner
            elif key == 'amenities':
                pass  # handled separately below
            elif key == 'custom_amenities':
                continue
            else:
                update_data[key] = value

        # Handle amenities update - clear and re-add
        if 'amenities' in place_data:
            update_data['amenities'] = self._resolve_amenities(place_data['amenities'])

        self.place_repo.update(place_id, update_data)
        return self.get_place(place_id)

    def delete_place(self, place_id):
        place = self.get_place(place_id)
        if not place:
            return None
        self.place_repo.delete(place_id)
        return place

    def _resolve_amenities(self, amenity_ids):
        amenities = []
        seen_ids = set()

        for amenity_id in amenity_ids or []:
            if not amenity_id or amenity_id in seen_ids:
                continue
            amenity = self.get_amenity(amenity_id)
            if not amenity:
                raise ValueError(f"Amenity with ID '{amenity_id}' does not exist")
            seen_ids.add(amenity_id)
            amenities.append(amenity)

        return amenities

    def create_review(self, review_data):
        user = self.get_user(review_data['user_id'])
        place = self.get_place(review_data['place_id'])
        if not user or not place:
            raise ValueError("Invalid user_id or place_id for review")
        review = Review(
            text=review_data['text'],
            rating=review_data['rating'],
            place=place,
            user=user
        )
        self.review_repo.add(review)
        return review

    def get_review(self, review_id):
        review = self.review_repo.get(review_id)
        if not review:
            raise ValueError("Review not found")
        return review

    def get_all_reviews(self):
        return self.review_repo.get_all()

    def get_reviews_by_place(self, place_id):
        return [
            review for review in self.review_repo.get_all()
            if review.place.id == place_id
        ]

    def update_review(self, review_id, review_data):
        review = self.get_review(review_id)
        self.review_repo.update(review_id, review_data)
        return review

    def delete_review(self, review_id):
        self.get_review(review_id)
        self.review_repo.delete(review_id)
        return True
