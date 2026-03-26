import os
import secrets


INSECURE_DEFAULT_SECRET_KEY = "hbnb-part4-default-secret-key-change-me-123456"
INSECURE_DEFAULT_JWT_SECRET_KEY = INSECURE_DEFAULT_SECRET_KEY


class Config:
    SECRET_KEY = os.getenv(
        'SECRET_KEY',
        INSECURE_DEFAULT_SECRET_KEY
    )
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', SECRET_KEY)
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PLACE_IMAGE_MAX_SIZE = 5 * 1024 * 1024
    PLACE_IMAGE_MAX_COUNT = 5
    MAX_CONTENT_LENGTH = (PLACE_IMAGE_MAX_SIZE * PLACE_IMAGE_MAX_COUNT) + (1024 * 1024)
    PLACE_IMAGE_UPLOAD_SUBDIR = os.path.join('static', 'uploads', 'places')
    PLACE_IMAGE_URL_PREFIX = '/static/uploads/places'
    ALLOWED_PLACE_IMAGE_EXTENSIONS = {'jpg', 'jpeg', 'png', 'webp'}
    USER_PROFILE_IMAGE_MAX_SIZE = 3 * 1024 * 1024
    USER_PROFILE_UPLOAD_SUBDIR = os.path.join('static', 'uploads', 'users')
    USER_PROFILE_IMAGE_URL_PREFIX = '/static/uploads/users'
    ALLOWED_USER_PROFILE_IMAGE_EXTENSIONS = {'jpg', 'jpeg', 'png', 'webp'}


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///development.db'
    SECRET_KEY = os.getenv('SECRET_KEY', secrets.token_hex(32))
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', SECRET_KEY)


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SECRET_KEY = os.getenv('SECRET_KEY', 'test-secret-key-for-hbnb-part4-1234567890')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'test-jwt-secret-key-for-hbnb-part4-1234567890')


config = {
    'testing': TestingConfig,
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}
