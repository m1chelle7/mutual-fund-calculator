from flask import flask
from app.controllers.mutualfunds_controller import mutualfunds_api

def create_app():
    app = Flask(__name__)
    app.register_blueprint(mutualfunds_api, url_prefix='/api')
    return app