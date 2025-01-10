from flask import request, jsonify
import requests

#Add hardcoded mutual_funds OR we can change to a database
mutual_funds = [
    {"ticker":"///", "name":"///"}
]

#Replace everything with actual API integration later--------

#Function to get mutual funds beta
def getBeta(ticker):
    return 0.0 #

#Function to get S&P 500 values
def getSP500Val():
    return 000.0 #


#Route to Get the list of mutual funds
@main.route('/api/mutual_funds', methods=['GET'])
def get_mutual_funds():
    return jsonify(mutual_funds)

#Route to get the future value of an investment
@main.route('/api/future_value', methods=['GET'])
def future_value():
    ticker = request.args.get('ticker')
    initial_investment = float(request.args.get('initial_investment'))
    time = int(request.args.get('time'))

    risk_free_rate = 0 #Adjust as needed
    
    #Get beta and S&P 500 value from functions
    beta = getBeta(ticker)
    sp500 = getSP500Val()

    #Calc market return rate 
    market_return = 0 #

    #Calc the future value
    future_value = initial_investment * (risk_free_rate + beta*(market_return-risk_free_rate))*time
    #I do not think this is the correct formula. Needs an exponent.
