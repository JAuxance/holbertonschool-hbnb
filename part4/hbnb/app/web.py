from flask import Blueprint, redirect, render_template, url_for
from app.utils.phone_countries import PHONE_COUNTRIES, DEFAULT_PHONE_COUNTRY


web_bp = Blueprint("web", __name__)


@web_bp.get("/")
@web_bp.get("/index.html")
def index():
    return render_template("index.html", page_name="index", page_title="Find Your Next Stay")


@web_bp.get("/login.html")
def login():
    return render_template("login.html", page_name="login", page_title="Sign In")


@web_bp.get("/signup.html")
def signup():
    return render_template("signup.html", page_name="signup", page_title="Sign Up")


@web_bp.get("/profile.html")
def profile():
    return render_template("profile.html", page_name="profile", page_title="Your Profile")


@web_bp.get("/settings.html")
def settings():
    return render_template("settings.html", page_name="settings", page_title="Account Settings")


@web_bp.get("/privacy.html")
def privacy():
    return render_template("privacy.html", page_name="privacy", page_title="Privacy Notice")


@web_bp.get("/data-rights.html")
def data_rights():
    return render_template("data_rights.html", page_name="data-rights", page_title="Data Rights")


@web_bp.get("/place.html")
def place():
    return render_template("place.html", page_name="place", page_title="Place Details")


@web_bp.get("/add_review.html")
def add_review():
    return render_template(
        "add_review.html",
        page_name="add-review",
        page_title="Add Your Review",
    )


@web_bp.get("/add_place.html")
def add_place():
    return render_template(
        "add_place.html",
        page_name="add-place",
        page_title="Create Place",
        phone_countries=PHONE_COUNTRIES,
        default_phone_country=DEFAULT_PHONE_COUNTRY,
    )


@web_bp.get("/add_user.html")
def add_user():
    return redirect(url_for("web.signup"))
