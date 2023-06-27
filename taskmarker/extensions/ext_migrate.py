from .ext_database import db
from flask_migrate import Migrate

migrate = Migrate()

def init_app(app):
    migrate.init_app(app, db, render_as_batch=True, compare_type=True)