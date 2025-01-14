import React from "react";

const CalculateButton = ({
  initialInvestment,
  investmentDuration,
  selectedFund,
  setErrorMessage,
  setResponseMessage,
}) => {
  const validateForm = () => {

    if (!initialInvestment || !investmentDuration || !selectedFund) {
      setErrorMessage(
        "Please fill in all the fields (Initial Investment, Investment Duration, and Mutual Fund)."
      );
      return false;
    }
    setErrorMessage(""); 
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!validateForm()) {
      return; 
    }

    const formattedData = {
      mutualFund: selectedFund,
      initialInvestment: parseFloat(initialInvestment), 
      investmentDuration: parseInt(investmentDuration, 10),
    };
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/investment/future-value", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(`Calculation successful: ${result.future_value}`);
      } else {
        setResponseMessage("Error calculating investment value.");
      }
    } catch (error) {
      setResponseMessage("An error occurred while processing your request.");
    }
  };

  return <button onClick={handleSubmit}>Calculate Future Value</button>;
};

export default CalculateButton;
