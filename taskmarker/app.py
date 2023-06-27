from flask import Flask
from .extensions import(
    ext_configs,
    ext_database,
    ext_migrate,
    ext_login
)
from flask_restful import Api
from .blueprints import bp_home, bp_login
from .blueprints.restAPI import task_api

app=Flask(__name__)

def create_app():
    #configura
    ext_configs.init_app(app=app)

    #extende o banco e as migraçoes de banco
    ext_database.init_app(app=app)
    ext_migrate.init_app(app=app)

    ext_login.init_app(app=app)

    app.register_blueprint(bp_home.bp)
    app.register_blueprint(bp_login.bp)

    api = Api(app, prefix='/api')
    api.add_resource(task_api.TasksApi, '/tasks')

    return app
