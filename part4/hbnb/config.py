import os


class Config:
    SECRET_KEY = os.getenv(
        'SECRET_KEY',
        'hbnb-part4-default-secret-key-change-me-123456'
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


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///development.db'


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


config = {
    'testing': TestingConfig,
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}
