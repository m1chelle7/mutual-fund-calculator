from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Calculation(db.Model):
    __tablename__ = "calculations"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    mutual_fund = db.Column(db.String(50), nullable=False)
    initial_investment = db.Column(db.Float, nullable=False)
    time_horizon = db.Column(db.Integer, nullable=False)
    return_rate = db.Column(db.Float, nullable=False)
    risk_free_rate = db.Column(db.Float, nullable=False)
    mutual_fund_beta = db.Column(db.Float, nullable=False)
    earnings = db.Column(db.Float, nullable=False)
    total_balance = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)