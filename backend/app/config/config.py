# config/config.py

class Config:
    # Constants
    RISK_FREE_RATE = 0.0467
    
    # API URLs
    NEWTON_ANALYTICS_URL = "https://api.newtonanalytics.com/stock-beta/?ticker={ticker}&index=^GSPC&interval=1mo&observations=12"
    SP500_API_URL = "https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key=d26079fc190512773ac705629a92f8ea&file_type=json"
