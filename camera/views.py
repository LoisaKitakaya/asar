from extensions import db
from models.images import Image
from camera.utils import upload_image_to_cloudinary
from flask import Blueprint, render_template, request, jsonify

bp = Blueprint("camera", __name__)


@bp.route("/selfie/", methods=["GET"])
def selfie():
    return render_template("webcam.html")


@bp.route("/selfie/upload_selfie/", methods=["POST"])
def upload_selfie():
    try:
        image_data = request.form.get("image_data")

        upload = upload_image_to_cloudinary(image_data)

        image = Image(image_url=upload["secure_url"])

        try:
            db.session.add(image)

        except Exception as e:
            raise Exception(str(e))

        else:
            db.session.commit()

            return jsonify({"message": "Image uploaded successfully!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
