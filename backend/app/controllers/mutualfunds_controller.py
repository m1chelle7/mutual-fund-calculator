from flask import Blueprint, jsonify, request
<<<<<<< HEAD
from backend.app.models.mutualfund_model import get_mutual_funds
from backend.app.services.external_api_service import get_beta_for_mutual_fund
from backend.app.services.future_value_service import calculate_future_value
=======
from app.models.mutualfund_model import get_mutual_funds
from app.services.external_api_service import get_beta_for_mutual_fund
from app.services.future_value_service import calculate_future_value, calculate_market_return_rate
>>>>>>> origin/main

mutualfunds_api = Blueprint("mutualfunds_api", __name__)


@mutualfunds_api.route("/mutual-funds", methods=["GET"])
def get_mutualfunds():
    return jsonify(get_mutual_funds())


@mutualfunds_api.route("/beta", methods=["GET"])
def get_beta():
    ticker = request.args.get("ticker")

    if not ticker:
        return (
            jsonify(
                {
                    "error": "Please provide a mutual fund ticker in the query parameter (e.g., ?ticker=VFIAX)"
                }
            ),
            400,
        )

    beta = get_beta_for_mutual_fund(ticker)

    if beta is None:
        return jsonify({"error": f"Beta not found for ticker {ticker}"}), 404

    return jsonify({"ticker": ticker, "beta": beta})

@mutualfunds_api.route("/market-return-rate", methods=["GET"])
def get_market_return_rate():
    return jsonify(calculate_market_return_rate())

@mutualfunds_api.route("/investment/future-value", methods=["GET"])
def future_value():
    ticker = request.args.get("ticker")
    initial_investment = request.args.get("initialInvestment", type=float)
    investment_time = request.args.get("investmentTime", type=int)

    if not ticker or not initial_investment or not investment_time:
        return (
            jsonify(
                {
                    "error": "Please provide all required parameters: ticker, initialInvestment, investmentTime"
                }
            ),
            400,
        )

    future_value_result = calculate_future_value(
        ticker, initial_investment, investment_time
    )

    return jsonify(
        {
            "ticker": ticker,
            "initial_investment": initial_investment,
            "investment_time": investment_time,
            "future_value": future_value_result,
        }
    )
