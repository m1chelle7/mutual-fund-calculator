from backend.app.services.external_api_service import (
    get_beta_for_mutual_fund,
    get_sp500_historical_data,
)
from math import exp

"""NOTE: I think this is the correct risk free rate. If wrong, please correct"""
RISK_FREE_RATE = 0.0467


def calculate_market_return_rate():
    sp500_data = get_sp500_historical_data()
    if sp500_data:
        """TODO: Correct access considering format?"""
        first_day_value = float(sp500_data[0]["value"])
        last_day_value = float(sp500_data[-1]["value"])
        return (last_day_value - first_day_value) / first_day_value
    print("S&P 500 data is not available.")
    return 0


def calculate_future_value(ticker, initial_investment, investment_time):
    beta = get_beta_for_mutual_fund(ticker)

    if not beta:
        return {"error": "Beta not found for the given mutual fund ticker"}

    market_return_rate = calculate_market_return_rate()
    rate = RISK_FREE_RATE + beta * (market_return_rate - RISK_FREE_RATE)
    future_value = initial_investment * exp(rate * investment_time)

    """TODO: Check if this is accurate enough"""
    return round(future_value, 2)
