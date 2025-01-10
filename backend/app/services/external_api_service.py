import requests

NEWTON_ANALYTICS_URL = "https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12"
SP500_API_URL = "https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key=d26079fc190512773ac705629a92f8ea&file_type=json"

def get_beta_for_mutual_fund(ticker):
    try:
        response = requests.get(NEWTON_ANALYTICS_URL.format(ticker=ticker))
        data = response.json()
        if response.status_code == 200 and 'beta' in data:
            return data['beta']
        else:
            print(f"Failed to fetch beta for {ticker}, response: {data}")
    except Exception as e:
        print(f"Error fetching beta: {e}")
    return None

def get_sp500_historical_data():
    try:
        response = requests.get(SP500_API_URL)
        data = response.json()
        if response.status_code == 200 and 'observations' in data:
            return data['observations']
        else:
            print(f"Failed to fetch S&P 500 data, response: {data}")
    except Exception as e:
        print(f"Error fetching S&P 500 data: {e}")
    return None