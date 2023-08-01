import os
from config import Config
from dotenv import load_dotenv
from flask_login import current_user
from flask_admin.contrib.sqla import ModelView
from flask import Flask, redirect, url_for, request

# blueprints

from home.views import bp as home_view
from camera.views import bp as camera_view
from users.views import bp as admin_view

# extensions

from extensions import db, migrate, login_manager, superuser

# models

from models.users import User
from models.images import Image

load_dotenv()


class AdminModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for("users.login", next=request.url))


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # blueprints

    app.register_blueprint(home_view)
    app.register_blueprint(camera_view)
    app.register_blueprint(admin_view)

    # extensions

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    superuser.init_app(app)

    # admin configuration

    superuser.add_view(AdminModelView(User, db.session))
    superuser.add_view(AdminModelView(Image, db.session))

    # auth configuration

    @login_manager.user_loader
    def load_user(user_id):
        return db.session.get(User, user_id)

    return app


if __name__ == "__main__":
    app = create_app()

    app.run(debug=True if os.getenv("MODE") == "development" else False)
