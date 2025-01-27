from flask import Blueprint, jsonify, request
from app.models.mutualfund_model import get_mutual_funds
from app.services.future_value_service import (
    calculate_future_value,
)
from app.config.config import Config
mutualfunds_api = Blueprint("mutualfunds_api", __name__)

@mutualfunds_api.route("/return-rate", methods=["GET"])
def get_return_rate():
    return jsonify(Config.RISK_FREE_RATE)

@mutualfunds_api.route("/mutual-funds", methods=["GET"])
def get_mutualfunds():
    return jsonify(get_mutual_funds())

@mutualfunds_api.route("/investment/future-value", methods=["POST"])
def future_value():
    data = request.get_json()
    ticker = data.get("mutualFund")
    initial_investment = data.get("initialInvestment")
    investment_time = data.get("investmentDuration")

    if ticker is None or initial_investment is None or investment_time is None:
        return (
            jsonify(
                {
                    "error": "Please provide all required fields: mutualFund, initialInvestment, investmentDuration"
                }
            ),
            400,
        )

    try:
        initial_investment = float(initial_investment)
        investment_time = int(investment_time)
    except ValueError:
        return (
            jsonify(
                {
                    "error": "Invalid data type for initialInvestment or investmentDuration"
                }
            ),
            400,
        )

    try:
        future_value_result = calculate_future_value(
            ticker, initial_investment, investment_time
        )

        if future_value_result is None or not isinstance(
            future_value_result, (int, float)
        ):
            raise ValueError("Invalid future value result")

    except Exception as e:
        return jsonify({"error": "Error calculating future value"}), 500

    return jsonify(
        {
            "ticker": ticker,
            "initial_investment": initial_investment,
            "investment_time": investment_time,
            "future_value": future_value_result,
        }
    )
