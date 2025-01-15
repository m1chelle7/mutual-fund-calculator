import React, { useState } from "react";
import Header from "./components/header/Header";
import MutualFunds from "./components/MutualFundTicker";
import InitialInvestmentInput from "./components/InitialInvestmentInput";
import InvestmentDurationInput from "./components/InvestmentDurationInput";
import CalculateButton from "./components/CalculateButton";
import { getFutureValue } from "./services/api";
import "./styles/App.css";

const App = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
const [investmentDuration, setInvestmentDuration] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleInvestmentChange = (value) => {
    setInitialInvestment(Number(value));
  };

  const handleDurationChange = (value) => {
    setInvestmentDuration(Number(value));
  };

  const handleFundSelectionChange = (fund) => {
    setSelectedFund(fund);
  };
  
  const validateForm = () => {
    if (initialInvestment === "" || investmentDuration === "" || selectedFund === "") {
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
      setResponseMessage(`Calculation successful: ${result.future_value}`);
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <InitialInvestmentInput onChange={handleInvestmentChange} />
        <InvestmentDurationInput onChange={handleDurationChange} />
        <MutualFunds onSelectFund={handleFundSelectionChange} />
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

        <CalculateButton handleSubmit={handleSubmit} />
      </form>

      {responseMessage && <div>{responseMessage}</div>}
    </div>
  );
};

export default App;
