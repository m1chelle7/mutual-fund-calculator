import React from "react";

const InvestmentDurationInput = ({ onChange }) => {
  const handleChange = (event) => {
    const value = Number(event.target.value);
    onChange(value);
  };

  return (
    <div>
      <label>
        Investment Duration (years):
        <input
          type="number"
          placeholder="Enter duration"
          onChange={handleChange}
          min="1"
        />
      </label>
    </div>
  );
};

export default InvestmentDurationInput;
