from flask import Blueprint, render_template


web_bp = Blueprint("web", __name__)


@web_bp.get("/")
@web_bp.get("/index.html")
def index():
    return render_template("index.html", page_name="index", page_title="Find Your Next Stay")


@web_bp.get("/login.html")
def login():
    return render_template("login.html", page_name="login", page_title="Sign In")


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
