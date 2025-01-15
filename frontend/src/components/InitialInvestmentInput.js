import React from "react";

const InitialInvestmentInput = ({ onChange }) => {
  const handleChange = (event) => {
    const value = Number(event.target.value); 
    if (value >= 0) { 
      onChange(value);
    }
  };

  return (
    <div>
      <label>
        Initial Investment:
        <input
          type="number"
          placeholder="Enter amount"
          onChange={handleChange}
          min="0"
        />
      </label>
    </div>
  );
};

export default InitialInvestmentInput;
