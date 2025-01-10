from flask import Blueprint, jsonify, request
from app.models.mutualfund_model import get_mutual_funds
from app.services.external_api_service import get_beta_for_mutual_fund

mutualfunds_api = Blueprint('mutualfunds_api', __name__)
@mutualfunds_api.route('/mutual-funds', methods=['GET'])
def get_mutualfunds():
    print("TESTING: GET /mutual-funds hit") 
    return jsonify(get_mutual_funds())

@mutualfunds_api.route('/beta', methods=['GET'])
def get_beta():
    ticker = request.args.get('ticker')
    if not ticker:
        return jsonify({"error": "Please provide a mutual fund ticker in the query parameter (e.g., ?ticker=VFIAX)"}), 400

    beta = get_beta_for_mutual_fund(ticker)

    if beta is None:
        return jsonify({"error": f"Beta not found for ticker {ticker}"}), 404

    return jsonify({"ticker": ticker, "beta": beta})

@mutualfunds_api.route('/investment/future-value', methods=['GET'])
def future_value():
    return jsonify({"message": "Future Value API is working!"})
