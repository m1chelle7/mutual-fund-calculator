from flask import Blueprint, jsonify
from app.models.mutualfund_model import get_mutual_funds

mutualfunds_api = Blueprint('mutualfunds_api', __name__)
@mutualfunds_api.route('/mutual-funds', methods=['GET'])
def get_mutualfunds():
    print("TESTING: GET /mutual-funds hit") 
    return jsonify(get_mutual_funds())
