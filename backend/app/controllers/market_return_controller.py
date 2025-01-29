from flask import Blueprint, jsonify, request
from app.services.future_value_service import (
    calculate_market_return_rate,
)

mutualfunds_api = Blueprint("mutualfunds_api", __name__)
@mutualfunds_api.route("/market-return-rate", methods=["GET"])
def get_market_return_rate():
    return jsonify(calculate_market_return_rate())