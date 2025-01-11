from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from backend.app.controllers.mutualfunds_controller import mutualfunds_api
from backend.app.controllers.calculations_controller import calculations_api
from backend.app.routes import main_bp  # Import the new route

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///calculations.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)

    # Register Blueprints
    app.register_blueprint(mutualfunds_api, url_prefix='/api')
    app.register_blueprint(calculations_api, url_prefix='/api')
    app.register_blueprint(main_bp)  # Register the home route

    return app
