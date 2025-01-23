from flask import request, jsonify
import requests

#Add hardcoded mutual_funds OR we can change to a database
mutual_funds = [
    {"ticker":"///", "name":"///", "category": "///"},
    {"ticker":"///", "name":"///", "category": "///"},
    {"ticker":"///", "name":"///", "category": "///"},
    {"ticker":"///", "name":"///", "category": "///"},
    {"ticker":"///", "name":"///", "category": "///"}
]

#Route to Get the list of mutual funds
@main.route('/api/mutual_funds', methods=['GET'])
def get_mutual_funds():
    return jsonify(mutual_funds)


#Replace everything with actual API integration later--------

#Function to get mutual funds beta
#Fetch Data from External APIs
def getBeta(ticker):
    url = "https://api.newtonanalytics.com/stock-beta/?ticker=VFIAX&index=^GSPC&interval=1mo&observations=12"
    response = requests.get(url)
    data = response.json()

    #Extract beta
    beta = data.get().get()
    return beta

#Function to get S&P 500 value
def getSP500Val():
    url = "https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key=d26079fc190512773ac705629a92f8ea&file_type=json"
    response = requests.get(url)
    data = response.json()

    #Extract value
    sp500_val = #data

    return float(sp500_val)

# def calc_future_valu(principal, time, beta, risk_free_rate, market_return):
#     return principal * (risk_free_rate + beta*(market_return-risk_free_rate))*time



#Route to get the future value of an investment
@main.route('/api/future_value', methods=['GET'])
def future_value():
    ticker = request.args.get('ticker')
    principal = float(request.args.get('principal'))
    time = int(request.args.get('time'))

    risk_free_rate = 0 #Adjust as needed
    
    #Get beta and S&P 500 value from functions
    beta = getBeta(ticker)
    sp500 = getSP500Val()

    #Calc market return rate 
    market_return = #Proper calculations

    #Calc the future value
    future_value = principal * (risk_free_rate + beta*(market_return-risk_free_rate))*time
    #I do not think this is the correct formula. Needs an exponent.

    return jsonify({"future_value": future_value})
