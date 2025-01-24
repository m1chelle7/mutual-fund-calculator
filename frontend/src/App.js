import React, { useState } from "react";
import Header from "./components/header/Header";
import MutualFunds from "./components/MutualFundTicker";
import InitialInvestmentInput from "./components/InitialInvestmentInput";
import InvestmentDurationInput from "./components/InvestmentDurationInput";
import CalculateButton from "./components/CalculateButton";
import { getFutureValue } from "./services/future_value_api";
import ResultSummary from "./components/ResultSummary";
import "./styles/App.css";

// TODO: Add loading
const App = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [investmentDuration, setInvestmentDuration] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [riskFreeRate, setRiskFreeRate] = useState(3);
  const [mutualFundBeta, setMutualFundBeta] = useState(1.2); 
  const [earnings, setEarnings] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [showResult, setShowResult] = useState(false);

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
    if (
      initialInvestment === "" ||
      investmentDuration === "" ||
      selectedFund === ""
    ) {
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

    const formattedData = {
      mutualFund: selectedFund,
      initialInvestment: initialInvestment === "" ? 0 : Number(initialInvestment),
      investmentDuration: investmentDuration === "" ? 0 : Number(investmentDuration),
    };

    try {
      const result = await getFutureValue(formattedData);
      const calculatedEarnings = result.future_value - initialInvestment;
      setEarnings(calculatedEarnings);
      setTotalBalance(result.future_value);

      setRiskFreeRate(3); 
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
    }
  };

  const formatEarnings = (earnings) => {
    return earnings < 0 ? `-$${Math.abs(earnings).toFixed(2)}` : `$${earnings.toFixed(2)}`;
  };

  const formatTotalBalance = (totalBalance) => {
    return `$${totalBalance.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <Header />
      <div className="flex justify-between max-w-screen mx-auto mt-5">
        <div className="w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mr-6">
          <form onSubmit={handleSubmit}>
            <InitialInvestmentInput onChange={handleInvestmentChange} />
            <InvestmentDurationInput onChange={handleDurationChange} />
            <MutualFunds onSelectFund={handleFundSelectionChange} />
            {errorMessage && (
              <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
            )}
            <div className="mt-10">
              <CalculateButton />
            </div>
          </form>
        </div>

        <div className="w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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
              initialInvestment={parseFloat(initialInvestment)}
              investmentDuration={parseInt(investmentDuration)}
              riskFreeRate={riskFreeRate}
              mutualFundBeta={mutualFundBeta}
              earnings={earnings}
              totalBalance={totalBalance}
              formattedEarnings={formatEarnings(earnings)} 
              formattedTotalBalance={formatTotalBalance(totalBalance)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
