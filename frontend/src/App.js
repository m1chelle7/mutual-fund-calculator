import React, { useState } from "react";
import Header from "./components/header/Header";
import MutualFunds from "./components/MutualFundTicker";
import InitialInvestmentInput from "./components/InitialInvestmentInput";
import InvestmentDurationInput from "./components/InvestmentDurationInput";
import CalculateButton from "./components/CalculateButton";
import { getFutureValue } from "./services/future_value_api";
import "./styles/App.css";

const App = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [investmentDuration, setInvestmentDuration] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleInvestmentChange = (value) => {
    setInitialInvestment(value);
  };

  const handleDurationChange = (value) => {
    console.log(`Value = ${value}`);
    setInvestmentDuration(value);
  };

  const handleFundSelectionChange = (fund) => {
    setSelectedFund(fund);
  };

  const validateForm = () => {
    console.log(investmentDuration)
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
      initialInvestment:
        initialInvestment === "" ? 0 : Number(initialInvestment),
      investmentDuration:
        investmentDuration === "" ? 0 : Number(investmentDuration),
    };

    try {
      const result = await getFutureValue(formattedData);
      setResponseMessage(`Calculation successful: ${result.future_value}`);
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <Header />
      <div className="flex justify-between max-w-screen-xl mx-auto mt-5">
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
            <div className="text-green-600 text-lg">
              <h2 className="font-semibold mb-2">Calculation Result</h2>
              <p>{responseMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
