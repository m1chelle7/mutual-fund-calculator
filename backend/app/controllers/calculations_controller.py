from flask import Blueprint, request, jsonify
from backend.app.models.models import db, Calculation
from datetime import datetime

calculations_api = Blueprint('calculations_api', __name__)

# Save Calculation Endpoint

@calculations_api.route('/save-calculation', methods=['POST'])
def save_calculation():
    data = request.json
    new_calc = Calculation(
        user_id=data['user_id'],
        mutual_fund=data['mutual_fund'],
        initial_investment=data['initial_investment'],
        time_horizon=data['time_horizon'],
        return_rate=data['return_rate'],
        risk_free_rate=data['risk_free_rate'],
        mutual_fund_beta=data['mutual_fund_beta'],
        earnings=data['earnings'],
        total_balance=data['total_balance']
    )
    db.session.add(new_calc)
    db.session.commit()
    
    return jsonify({"message": "Calculation saved successfully!"}), 201


# Retrieve Saved Calculations

@calculations_api.route('/get-calculations/<user_id>', methods=['GET'])
def get_calculations(user_id):
    calculations = Calculation.query.filter_by(user_id=user_id).all()
    
    result = [
        {
            "id": calc.id,
            "mutual_fund": calc.mutual_fund,
            "initial_investment": calc.initial_investment,
            "time_horizon": calc.time_horizon,
            "return_rate": calc.return_rate,
            "risk_free_rate": calc.risk_free_rate,
            "mutual_fund_beta": calc.mutual_fund_beta,
            "earnings": calc.earnings,
            "total_balance": calc.total_balance,
            "created_at": calc.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        for calc in calculations
    ]
    
    return jsonify(result), 200