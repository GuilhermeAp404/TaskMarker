from flask import (
    Blueprint,
    flash,
    render_template,
    request,
    url_for,
    redirect
)
from flask_login import current_user, login_required
from ..extensions.ext_database import db


bp= Blueprint('home_page', __name__, template_folder='templates')


@bp.route('/', methods=['GET'])
def home():
    if current_user.is_authenticated:
        return redirect(url_for(endpoint='home_page.calendar'))

    return render_template('login_register.html')


@bp.route('/calendar', methods=['GET'])
@login_required
def calendar():
    return render_template('calendar_page.html')


@bp.route('/test', methods=['GET'])
@login_required
def test():
    return render_template('testModal.html')

