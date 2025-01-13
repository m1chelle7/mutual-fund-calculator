import React from "react";

const InitialInvestmentInput = ({ onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label>
        Initial Investment:
        <input
          type="number"
          placeholder="Enter amount"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default InitialInvestmentInput;
