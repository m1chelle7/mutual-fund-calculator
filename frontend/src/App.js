import React, { useState } from "react";
import Header from "./components/header/Header";
import MutualFunds from "./components/LeftPanel/MutualFundTicker";
import InitialInvestmentInput from "./components/LeftPanel/InitialInvestmentInput";
import InvestmentDurationInput from "./components/LeftPanel/InvestmentDurationInput";
import CalculateButton from "./components/LeftPanel/CalculateButton";
import { getFutureValue } from "./services/future_value_api";
import { getReturnRate } from "./services/return_rate_api"
import ResultSummary from "./components/RightPanel/ResultSummary";
import "./styles/App.css";
import Image from "./asset/Header.png";

const App = () => {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [investmentDuration, setInvestmentDuration] = useState(0);
  const [CalculatedInitialInvestment, setCalculatedInitialInvestment] = useState(0);
  const [CalculatedInvestmentDuration, setCalculatedInvestmentDuration] = useState(0);
  const [selectedFund, setSelectedFund] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [riskFreeRate, setRiskFreeRate] = useState(0);
  const [mutualFundBeta, setMutualFundBeta] = useState(1.2);
  const [earnings, setEarnings] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInvestmentChange = (value) => {
    setInitialInvestment(value);
  };

  const handleDurationChange = (value) => {
    setInvestmentDuration(value);
  };

  const handleFundSelectionChange = (fund) => {
    setSelectedFund(fund);
  };

  const validateForm = () => {
    if (!initialInvestment || !investmentDuration || !selectedFund) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setShowResult(false);

    const formattedData = {
      mutualFund: selectedFund,
      initialInvestment:
        initialInvestment === "" ? 0 : Number(initialInvestment),
      investmentDuration:
        investmentDuration === "" ? 0 : Number(investmentDuration),
    };

    try {
      const riskFreeRate = await getReturnRate()
      const result = await getFutureValue(formattedData);
      const calculatedEarnings = result.future_value - initialInvestment;
      setCalculatedInitialInvestment(initialInvestment);
      setCalculatedInvestmentDuration(investmentDuration);
      setEarnings(calculatedEarnings);
      setTotalBalance(result.future_value);

      setRiskFreeRate(riskFreeRate);
      setMutualFundBeta(1.2);

      if (calculatedEarnings < 0) {
        setResponseMessage("You lost money on this investment.");
      } else if (calculatedEarnings > 0) {
        setResponseMessage("Congratulations, you earned money!");
      } else {
        setResponseMessage("No earnings or losses.");
      }

      setShowResult(true);
    } catch (error) {
      setResponseMessage(error.message);
      setShowResult(false);
    } finally {
      setLoading(false);
    }
  };

  const formatEarnings = (earnings) => {
    return earnings < 0
      ? `-$${Math.abs(earnings).toFixed(2)}`
      : `$${earnings.toFixed(2)}`;
  };

  const formatTotalBalance = (totalBalance) => {
    return `$${totalBalance.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <Header />
      <img src={Image} alt="background" className="backgrounDesign"/>
      <div className="flex justify-between max-w-screen mx-auto mt-5">
        <div className="w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mr-6">
          <form>
            <InitialInvestmentInput onChange={handleInvestmentChange} />
            <InvestmentDurationInput onChange={handleDurationChange} />
            <MutualFunds onSelectFund={handleFundSelectionChange} />
            {errorMessage && (
              <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
            )}
            <div className="mt-10">
              <CalculateButton handleSubmit={handleSubmit} />
            </div>
          </form>
        </div>

        <div className="w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full border-t-4 border-green-500 h-12 w-12"></div>
            </div>
          ) : (
            <>
              {responseMessage && (
                <div
                  className={`${
                    responseMessage.includes("lost")
                      ? "bg-red-100 text-red-800"
                      : responseMessage.includes("earned")
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  } p-4 rounded-lg mb-4`}
                >
                  <strong>{responseMessage}</strong>
                </div>
              )}

              {showResult && (
                <ResultSummary
                  initialInvestment={parseFloat(CalculatedInitialInvestment)}
                  investmentDuration={parseInt(CalculatedInvestmentDuration)}
                  riskFreeRate={riskFreeRate}
                  mutualFundBeta={mutualFundBeta}
                  earnings={earnings}
                  totalBalance={totalBalance}
                  formattedEarnings={formatEarnings(earnings)}
                  formattedTotalBalance={formatTotalBalance(totalBalance)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
