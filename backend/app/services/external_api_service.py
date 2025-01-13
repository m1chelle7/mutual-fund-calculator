import requests
from datetime import datetime

NEWTON_ANALYTICS_URL = "https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12"
SP500_API_URL = "https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key=d26079fc190512773ac705629a92f8ea&file_type=json"


def get_beta_for_mutual_fund(ticker):
    try:
        url = NEWTON_ANALYTICS_URL.format(ticker=ticker)
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()

            if "data" in data:
                return data["data"]
            else:
                print(f"Beta not found in the response data for ticker {ticker}")
        else:
            print(
                f"Failed to fetch beta for {ticker}. HTTP Status Code: {response.status_code}"
            )

    except Exception as e:
        print(f"Error fetching beta: {e}")

    return None


def get_sp500_historical_data():
    try:
        response = requests.get(SP500_API_URL)
        data = response.json()

        if response.status_code == 200 and "observations" in data:
            current_year = datetime.now().year
            previous_year = current_year - 1

            start_date = f"{previous_year}-01-01"
            end_date = f"{previous_year}-12-31"

            filtered_data = [
                obs
                for obs in data["observations"]
                if start_date <= obs["date"] <= end_date and obs["value"] != "."
            ]

            if len(filtered_data) == 0:
                return f"No data available for {previous_year}"

            return filtered_data

        else:
            print(f"Failed to fetch S&P 500 data, response: {data}")

    except Exception as e:
        print(f"Error fetching S&P 500 data: {e}")
    return None
