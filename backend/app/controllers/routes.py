from flask import Blueprint, jsonify

# Create a Blueprint for general routes
main_bp = Blueprint('main', __name__)

# Home route to prevent 404 errors
@main_bp.route('/')
def home():
    return jsonify({"message": "Welcome to the Mutual Fund Calculator API!"}), 200

# Optional: Suppress favicon.ico 404 errors
@main_bp.route('/favicon.ico')
def favicon():
    return '', 204  # Return empty response with HTTP 204 (No Content)