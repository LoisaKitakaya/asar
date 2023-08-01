import cloudinary
import cloudinary.api
import cloudinary.uploader
from flask import current_app


def upload_image_to_cloudinary(image_data):
    cloudinary.config(
        cloud_name=current_app.config["CLOUDINARY_CLOUD_NAME"],
        api_key=current_app.config["CLOUDINARY_API_KEY"],
        api_secret=current_app.config["CLOUDINARY_API_SECRET"],
    )

    upload_response = cloudinary.uploader.upload(image_data)

    return upload_response
