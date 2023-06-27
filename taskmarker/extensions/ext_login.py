from flask import flash
from flask_login import LoginManager
from flask import redirect, url_for

login_manager=LoginManager()


def init_app(app):
    login_manager.init_app(app)

@login_manager.unauthorized_handler
def unauthorized():
    flash('Vocè deve se autenticar para utilizar essa pagina')
    return redirect(url_for(endpoint='home_page.home'))