import re
from flask import (
    Blueprint,
    flash,
    request,
    url_for,
    redirect
)
from flask_login import login_user, logout_user, login_required
from ..extensions.ext_database import db
from ..extensions.ext_login import login_manager
from taskmarker.models import User


def validate_email(email):
    pattern = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(com|org)+(\.br)?$')
    return pattern.match(email)

bp= Blueprint('login', __name__, template_folder='templates')

@bp.route('/register', methods=['GET', 'POST'])
def register():
    try:

        if request.method=='POST':
            email = request.form.get('register-email')
            name = request.form.get('register-name')
            password = request.form.get('register-password')
            confirm_password = request.form.get('register-confirmation-password')

            if validate_email(email) and password==confirm_password:
                user= User(email, name, password)

                db.session.add(user)
                db.session.commit()
                db.session.close()

            else:
                flash('As senhas não são compativeis ou o email está fora do padrão')

        return redirect(url_for(endpoint='home_page.home'))
    except Exception as e:
        print(e)
        return redirect(url_for(endpoint='home_page.home'))

@bp.route('/login', methods=['POST', 'GET'])
def login():
    try:
        if request.method=='POST':
            email = request.form['email']
            password = request.form['password']

            user= User.query.filter_by(email=email).first()

            if not user or not user.verify_pwd(password):
                flash('Verifique e-mail ou senha, um dos dois pode estar errado')
                return redirect(url_for(endpoint='home_page.home'))
            else:
                login_user(user)
                return redirect(url_for(endpoint='home_page.calendar'))
    except Exception as ex:
        print(ex)
        return redirect(url_for(endpoint='home_page.home'))

@bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for(endpoint='home_page.home'))

