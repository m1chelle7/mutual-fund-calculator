# backend/tests/test_external_api_service.py

import pytest
import requests
from app.services.external_api_service import get_beta_for_mutual_fund, get_sp500_historical_data


#Mock for get_beta_for_mutual_fund
def test_get_beta_for_mutual_fund_success(requests_mock):
    ticker = "AAPL"
    mock_response = {"data": {"beta": 1.2}}
    requests_mock.get(f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12", json=mock_response)

    result = get_beta_for_mutual_fund(ticker)

    assert result == mock_response["data"]

def test_get_beta_for_mutual_fund_failure(requests_mock):
    ticker="AAPL"
    requests_mock.get(f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12", status_code=404)

    result = get_beta_for_mutual_fund(ticker)
    assert result is None

def test_get_beta_for_mutual_fund_empty_response(requests_mock):
    ticker = "AAPL"
    requests_mock.get(f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12", json={})

    result = get_beta_for_mutual_fund(ticker)

    assert result is None

#Mock for get_sp500_historical_data
def test_get_sp500_historical_data_success(requests_mock):
    mock_response = {
        "observations": [
            {"date": "2024-01-01", "value": "3800"},
            {"date": "2024-12-31", "value": "3900"}
        ]
    }

    requests_mock.get("https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key=d26079fc190512773ac705629a92f8ea&file_type=json", json=mock_response)

    result = get_sp500_historical_data()

    assert len(result) == 2
    assert result[0]["date"] == "2024-01-01"
    assert result[1]["value"] == "3900"

def test_get_sp500_historical_data_failure(requests_mock):
    requests_mock.get("https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key=d26079fc190512773ac705629a92f8ea&file_type=json", status_code=500)

    result = get_sp500_historical_data()

    assert result is None
    
