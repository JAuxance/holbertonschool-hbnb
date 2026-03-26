from flask import Flask
from flask_restx import Api
from app.extensions import db, bcrypt, jwt
import app.models  # noqa: F401
from app.api.v1.users import api as users_ns
from app.api.v1.amenities import api as amenities_ns
from app.api.v1.places import api as places_ns
from app.api.v1.reviews import api as reviews_ns
from app.api.v1.auth import api as auth_ns
from app.web import web_bp
from config import INSECURE_DEFAULT_JWT_SECRET_KEY, INSECURE_DEFAULT_SECRET_KEY


def create_app(config_class="config.DevelopmentConfig", config_overrides=None):
    app = Flask(__name__)

    if isinstance(config_class, dict):
        app.config.from_mapping(config_class)
    else:
        app.config.from_object(config_class)

    if config_overrides:
        app.config.from_mapping(config_overrides)

    if not app.config.get("DEBUG") and not app.config.get("TESTING"):
        if app.config.get("SECRET_KEY") in {None, "", INSECURE_DEFAULT_SECRET_KEY}:
            raise RuntimeError("SECRET_KEY must be explicitly configured in non-development environments.")
        if app.config.get("JWT_SECRET_KEY") in {None, "", INSECURE_DEFAULT_JWT_SECRET_KEY}:
            raise RuntimeError("JWT_SECRET_KEY must be explicitly configured in non-development environments.")

    db.init_app(app)

    bcrypt.init_app(app)
    jwt.init_app(app)
    app.register_blueprint(web_bp)

    api = Api(app, version='1.0', title='HBnB API',
              description='HBnB Application API', doc='/api/v1/')

    api.add_namespace(users_ns, path='/api/v1/users')
    api.add_namespace(amenities_ns, path='/api/v1/amenities')
    api.add_namespace(places_ns, path='/api/v1/places')
    api.add_namespace(reviews_ns, path='/api/v1/reviews')
    api.add_namespace(auth_ns, path='/api/v1/auth')

    @app.after_request
    def apply_security_headers(response):
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault(
            "Permissions-Policy",
            "geolocation=(), camera=(), microphone=()",
        )
        return response

    return app
