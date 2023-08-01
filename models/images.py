from extensions import db


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(200), nullable=False)
    approved = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<Image {self.image_url}>"
