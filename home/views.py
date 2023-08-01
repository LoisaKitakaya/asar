from extensions import db
from sqlalchemy import and_
from datetime import datetime
from models.images import Image
from flask import Blueprint, render_template

bp = Blueprint("home", __name__)


@bp.route("/", methods=["GET"])
def index():
    today = datetime.now().timestamp()
    start_date = datetime(2023, 8, 15).timestamp()

    approved_images = []

    if start_date <= today:
        approved_images = Image.query.filter_by(approved=True).all()

    print(approved_images)

    return render_template("index.html", images=approved_images)
