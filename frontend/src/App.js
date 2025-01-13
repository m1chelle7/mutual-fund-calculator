import React, { useState } from "react";
import Header from "./components/header/Header";
import MutualFunds from "./components/MutualFundTicker";
import InitialInvestmentInput from "./components/InitialInvestmentInput";
import InvestmentDurationInput from "./components/InvestmentDurationInput";
import CalculateButton from "./components/CalculateButton";
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
    setInvestmentDuration(value);
  };

  const handleFundSelectionChange = (fund) => {
    setSelectedFund(fund);
  };

  return (
    <div>
      <Header />
      <div>
        <InitialInvestmentInput onChange={handleInvestmentChange} />
        <InvestmentDurationInput onChange={handleDurationChange} />
        <MutualFunds onSelectFund={handleFundSelectionChange} />

        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

        <CalculateButton
          initialInvestment={initialInvestment}
          investmentDuration={investmentDuration}
          selectedFund={selectedFund}
          setErrorMessage={setErrorMessage}
          setResponseMessage={setResponseMessage}
        />

        {responseMessage && <div>{responseMessage}</div>}
      </div>
    </div>
  );
};

export default App;
