import datetime
from .extensions.ext_database import db
from .extensions.ext_login import login_manager
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash


@login_manager.user_loader
def load_user(id):
    return User.query.filter_by(id=id).first()

#modelos do banco de dados
class User(db.Model, UserMixin):
    __tablename__='users'
    id=db.Column(db.Integer(), primary_key=True, autoincrement=True)
    email=db.Column(db.String(86), nullable=False, unique=True)
    name=db.Column(db.String(86), nullable=False)
    password= db.Column(db.String(40), nullable=False)

    def __init__(self, email:str, name:str, pwd:str):
        self.email=email
        self.name=name
        self.password=generate_password_hash(pwd)


    def verify_pwd(self, pwd):
        return check_password_hash(self.password, pwd)

class Task(db.Model):
    __tablename__='tasks'
    id=db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id=db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    title=db.Column(db.String(40))
    description=db.Column(db.String(125))
    allDay=db.Column(db.Boolean(), nullable=False)
    color=db.Column(db.String(7))
    start=db.Column(db.DateTime(), nullable=False)
    end=db.Column(db.DateTime(), nullable=False)

    def __init__(self, title: str, user_id: int, description: str, allDay: bool, color: str, start: datetime, end: datetime)-> None:
        self.user_id=user_id
        self.title=title
        self.description=description
        self.allDay=allDay
        self.color= color
        self.start=start
        self.end=end
