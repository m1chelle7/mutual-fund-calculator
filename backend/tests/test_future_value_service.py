# backend/tests/test_future_value_service.py

'''NOTE:The only issue here is that I just have to get the market return value.
import pytest
from unittest.mock import patch
from app.services.future_value_service import calculate_future_value
from app.services.external_api_service import (
    get_beta_for_mutual_fund,
    get_sp500_historical_data,
)
from math import exp

RISK_FREE_RATE = 0.0467

#Check when both beta and market return rate is available
@patch("app.services.future_value_service.get_beta_for_mutual_fund")
@patch("app.services.future_value_service.calculate_market_return_rate")
@patch("app.services.future_value_service.get_sp500_historical_data")
def test_calculate_future_value_success(mock_market_return_rate, mock_beta):
    market_return_value = 120.2
    beta_value = 0.979298922337579
    mock_market_return_rate.return_value = market_return_value
    mock_beta.return_value = beta_value


    RISK_FREE_RATE=0.0467

    #Testing data
    ticker = "GSPC"
    initial_investment = 1000.0
    investment_time = 5
    #Calculating expected result
    rate = RISK_FREE_RATE + beta_value * (market_return_value - RISK_FREE_RATE)
    expected_future_value = initial_investment*exp(rate*investment_time)

    result = calculate_future_value(ticker, initial_investment, investment_time)

    assert result == round(expected_future_value, 4)
    mock_beta.assert_called_once_with(ticker)


#Check when beta is not available
@patch("app.services.future_value_service.get_sp500_historical_data") 
@patch("app.services.future_value_service.get_beta_for_mutual_fund")

def test_calculate_future_value_beta_failure(mock_market_return_rate, mock_beta):
    mock_market_return_rate = 120.2
    
    mock_beta.return_value = None #Simulate missing beta

    ticker="AAPL"
    initial_investment=1000
    investment_time=5

    result = calculate_future_value(ticker, initial_investment, investment_time)

    assert result=={"error": "Beta not found for the given mutual fund ticker"}

'''





"""
#Check when the market return rate is not available
# @patch("app.services.future_value_service.get_sp500_historical_data")
@patch("app.services.future_value_service.calculate_market_return_rate") 
@patch("app.services.future_value_service.get_beta_for_mutual_fund")

def test_calculate_future_value_no_sp500_data(mock_market_return_rate, mock_beta):
    mock_market_return_rate.return_value = None #Simulate missing S&P 500 data
    mock_beta.return_value = 0.979298922337579 #Find actual beta value

    ticker = "GSPC"
    initial_investment = 1000
    investment_time = 5

    result = calculate_future_value(ticker, initial_investment, investment_time)


    assert result == {"error": "Market return rate not found"}
    mock_market_return_rate.assert_called_once()
    mock_beta.assert_not_called()
"""