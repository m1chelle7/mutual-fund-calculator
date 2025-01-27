
import pytest
from flask import Flask, jsonify
from app.controllers.mutualfunds_controller import mutualfunds_api
from app.services.external_api_service import get_beta_for_mutual_fund
from app.services.future_value_service import calculate_future_value
from unittest.mock import patch


@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(mutualfunds_api)
    app.testing = True
    return app


def test_get_mutualfunds(app):
    with app.test_client() as client:
        response = client.get("/mutual-funds")
        assert response.status_code == 200
        assert len(response.json)>0
        assert "ticker" in response.json[0]


@patch("app.services.external_api_service.get_beta_for_mutual_fund")
def test_get_beta_success(mock_get_beta, app):
    # mock_get_beta.return_value = -0.6530107924223588

    with app.test_client() as client:
        response = client.get("/beta?ticker=VSMPX")
        assert response.status_code == 200
        assert response.json["ticker"] == "VSMPX"
        # assert response.json["beta"] == -0.6530107924223588

def test_get_beta_missing_ticker(app):
    with app.test_client() as client:
        response = client.get("/beta")
        assert response.status_code == 400
        assert "Please provide a mutual fund ticker" in response.json["error"]


     
#Check when beta is not found
# @patch("app.services.external_api_service.get_beta_for_mutual_fund")
# def test_get_beta_not_found(mock_get_beta, app):
#     mock_get_beta.return_value = None

#     with app.test_client() as client:
#         response  = client.get("/beta?ticker=VSMPX")
#         assert response.status_code == 404
#         assert response.json == {"error": "Beta not found for ticker VSMPX"}



@patch("app.services.future_value_service.calculate_market_return_rate")
def test_get_market_return_rate(mock_calculate_rate, app):
    # mock_calculate_rate.return_value = 0.07

    with app.test_client() as client:
        response = client.get("/market-return-rate")
        assert response.status_code == 200
        # assert response.json == 0.07



@patch("app.services.future_value_service.calculate_future_value")
def test_future_value(mock_calculate_value, app):
    # mock_calculate_value.return_value = 1500 "Unknown"

    with app.test_client() as client:
        response = client.post("/investment/future-value",
                               json={
                                   "mutualFund": "VFIAX",
                                   "initialInvestment": 1000.0,
                                   "investmentDuration": 5
                               })
        assert response.status_code == 200
        # assert response.json["future_value"] == 1500 "Unknown"


#Test for future value calc failure
#Test keeps passing!!!
# @patch("app.services.future_value_service.calculate_future_value")
# def test_future_value_calc_failure(mock_calculate, app):
#     mock_calculate.side_effect = Exception("Calculation failed")
#     # mock_calculate.return_value = 
#     with app.test_client() as client:
#         response = client.post("/investment/future-value",
#                                json={
#                                    "mutualFund": "VSMPX",
#                                    "initialInvestment": 1000.0,
#                                    "investmentDuration": 5,
#                                })
#         assert response.status_code == 500
#         assert "Error calculating future value" in response.json["error"]



def test_future_value_missing_params(app):
    with app.test_client() as client:
        response = client.post("/investment/future-value", json={})
        assert response.status_code == 400
        assert "Please provide all required fields: mutualFund, initialInvestment, investmentDuration" in response.json["error"]


def test_future_value_invalid_data_types(app):
    with app.test_client() as client:
        response = client.post("/investment/future-value",
                               json={
                                   "mutualFund": "VFIAX",
                                   "initialInvestment": "invalid",
                                   "investmentDuration": "invalid"
                               })
        assert response.status_code == 400
        assert "Invalid data type for initialInvestment or investmentDuration" in response.json["error"]
