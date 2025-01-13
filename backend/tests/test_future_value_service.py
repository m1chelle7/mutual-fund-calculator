# backend/tests/test_future_value_service.py


import pytest
from unittest.mock import patch
from app.services.future_value_service import calculate_future_value
from math import exp

#Check when both beta and market return rate is available
@patch("app.services.future_value_service.get_beta_for_mutual_fund")
@patch("app.services.future_value_service.get_sp500_historical_data")

def test_calculate_future_value_success(mock_sp500_data, mock_beta):
    #Mock sp500 data
    mock_sp500_data.return_value = [
        {"date": "2024-01-01", "value": "3800"},
        {"date": "2024-12-31", "value": "3900"}
    ]
    mock_beta.return_value = 1.2 #Mock beta value

    RISK_FREE_RATE=0.0467

    #Testing data
    ticker = "AAPL"
    initial_investment = 1000
    investment_time = 5

    #Calculating expected result
    market_return_rate = (3900-3800)/3800
    rate = RISK_FREE_RATE + 1.2 * (market_return_rate - RISK_FREE_RATE)
    expected_future_value = initial_investment*exp(rate*investment_time)

    result = calculate_future_value(ticker, initial_investment, investment_time)

    assert result == round(expected_future_value, 4)

#Check when beta is not available
@patch("app.services.future_value_service.get_sp500_historical_data") 
@patch("app.services.future_value_service.get_beta_for_mutual_fund")

def test_calculate_future_value_beta_failure(mock_sp500_data, mock_beta):
    mock_sp500_data.return_value = [
        {"date": "2024-01-01", "value": "3800"},
        {"date": "2024-12-31", "value": "3900"}
    ]
    
    mock_beta.return_value = None #Simulate missing beta

    ticker="AAPL"
    initial_investment=1000
    investment_time=5

    result = calculate_future_value(ticker, initial_investment, investment_time)

    assert result=={"error": "Beta not found for the given mutual fund ticker"}

#Check when the S&P 500 data is not available
@patch("app.services.future_value_service.get_sp500_historical_data") 
@patch("app.services.future_value_service.get_beta_for_mutual_fund")

def test_calculate_future_value_no_sp500_data(mock_sp500_data, mock_beta):
    mock_sp500_data.return_value = None #Simulate missing S&P 500 data
    mock_beta.return_value = 1.2

    ticker = "AAPL"
    initial_investment = 1000
    investment_time = 5

    result = calculate_future_value(ticker, initial_investment, investment_time)

    assert result == {"error": "Market return rate not found"}


'''Check that `get_beta_for_mutual_fun` does not return a dictionary but a float or integer
Check that `calculate_market_return_rate` function does error handling when S&P 500 data is missing
Check that `calculate_future_value` function return the appropriate error messages for missing data.
'''