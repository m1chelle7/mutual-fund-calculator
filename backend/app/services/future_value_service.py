from app.services.external_api_service import (
    get_beta_for_mutual_fund,
    get_sp500_historical_data,
)
from math import exp

RISK_FREE_RATE = 0.0467


def calculate_market_return_rate():
    sp500_data = get_sp500_historical_data()

    if sp500_data:
        start_value = float(sp500_data[0]["value"])
        end_value = float(sp500_data[-1]["value"])
        """TODO: What if start_value is 0"""
        market_return_rate = (end_value - start_value) / start_value
        return round(market_return_rate, 8)

    print("S&P 500 data is not available.")
    return 0


def calculate_future_value(ticker, initial_investment, investment_time):
    beta = get_beta_for_mutual_fund(ticker)

    if not beta:
        return {"error": "Beta not found for the given mutual fund ticker"}

    market_return_rate = calculate_market_return_rate()

    if not market_return_rate:
        return {"error": "Market return rate not found"}

    rate = RISK_FREE_RATE + beta * (market_return_rate - RISK_FREE_RATE)
    future_value = initial_investment * exp(rate * investment_time)

    return round(future_value, 4)
