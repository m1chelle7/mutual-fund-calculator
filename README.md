# Mutual Fund Calculator

## Objective
The goal of this project is to design a **Mutual Fund Calculator** web app. The app will allow users to estimate future returns on mutual fund investments based on the following inputs:
- **Initial Investment**
- **Mutual Fund Ticker**
- **Investment Duration (in years)**

Users can input these values to calculate the future value of their investment, taking into account the mutual fund's historical performance and market return rates.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd mutual-fund-calculator
   ```

### Backend Setup
Follow the instructions in the `backend/README.md` file to set up the backend.

## API Endpoints

1. **GET /api/mutual-funds**  
   Returns a list of available mutual funds.

2. **GET /api/calculate-future-value**  
   Takes in mutual fund ticker, initial investment amount, and time horizon to return the estimated future value of the investment.

## Technologies Used
- **Backend**: Python, Flask
- **Frontend**: JavaScript, React
- **APIs**: [Newton API](#) for mutual fund data, [S&P 500 data API](#) for market data

