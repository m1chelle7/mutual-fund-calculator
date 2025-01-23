# backend/tests/test_external_api_service.py

import pytest
from unittest.mock import patch
import requests
from app.services.external_api_service import get_beta_for_mutual_fund, get_sp500_historical_data


#MOCK FOR get_beta_for_mutual_fund
def test_get_beta_for_mutual_fund_success(mocker):
    mock_get = mocker.patch('app.services.external_api_service.requests.get')
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {"unknown_key": "unknown_value"}
    ticker = "VSMPX"
    result = get_beta_for_mutual_fund(ticker)
    assert result is None
    mock_get.assert_called_once_with(f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12")

# def test_get_beta_for_mutual_fund_success():
#     with patch('app.services.external_api_service.request.get') as mock_get:
    
#         mock_get.return_value.status_code = 200
#         ticker = 'AAPL'
#         result = get_beta_for_mutual_fund(ticker)
#         assert result is not None
#         mock_get.assert_called_once_with(f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12")

def test_get_beta_for_mutual_fund_failure():
    with patch('app.services.external_api_service.requests.get') as mock_get:
        mock_get.return_value.status_code = 404
        ticker = "VSPMX"
        result = get_beta_for_mutual_fund(ticker)
        assert result is None
        mock_get.assert_called_once_with(f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12")

def test_get_beta_for_mutual_fund_empty_response():
    with patch('app.services.external_api_service.requests.get') as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.return_value = {}

        ticker = "VSPMX"
        result = get_beta_for_mutual_fund(ticker)
        assert result is None
        mock_get.assert_called_once_with(f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12")


#MOCK FOR get_sp500_historical_data
# def test_get_sp500_historical_data_success():



'''
#Mock for get_sp500_historical_data
def test_get_sp500_historical_data_success():
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
'''

























"""
#Mock for get_beta_for_mutual_fund
def test_get_beta_for_mutual_fund_success():
    ticker = "AAPL"
    mock_response = {"data": {"beta": 1.2}}
    requests_mock.get(f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12", json=mock_response)

    result = get_beta_for_mutual_fund(ticker)

    assert result == mock_response["data"]

def test_get_beta_for_mutual_fund_failure():
    ticker="AAPL"
    requests_mock.get(f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12", status_code=404)

    result = get_beta_for_mutual_fund(ticker)
    assert result is None

def test_get_beta_for_mutual_fund_empty_response():
    ticker = "AAPL"
    requests_mock.get(f"https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12", json={})

    result = get_beta_for_mutual_fund(ticker)

    assert result is None
"""