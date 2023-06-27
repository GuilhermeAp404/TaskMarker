from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

#configura a exrtensão do banco de dados
def init_app(app):
    db.init_app(app)