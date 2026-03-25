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
