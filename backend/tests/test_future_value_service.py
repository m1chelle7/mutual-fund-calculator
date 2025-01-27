# backend/tests/test_future_value_service.py

import pytest
from unittest.mock import patch
from app.services.future_value_service import calculate_future_value, get_beta_for_mutual_fund, calculate_market_return_rate
from math import exp

RISK_FREE_RATE = 0.0467


@patch("app.services.future_value_service.get_beta_for_mutual_fund")
@patch("app.services.future_value_service.calculate_market_return_rate")
def test_calculate_future_value_success(mock_market_return_rate, mock_beta):
     market_return_value = 0.24010981
     beta_value = 0.979298922337579
     mock_market_return_rate.return_value = market_return_value
     mock_beta.return_value = beta_value

     ticker = "GSPC"
     initial_investment = 1000.0
     investment_time = 5

     rate = RISK_FREE_RATE + beta_value * (market_return_value - RISK_FREE_RATE)
     expected_future_value = initial_investment*exp(rate*investment_time)

     result = calculate_future_value(ticker, initial_investment, investment_time)

     assert result == round(expected_future_value, 4)
     mock_beta.assert_called_once_with(ticker)

