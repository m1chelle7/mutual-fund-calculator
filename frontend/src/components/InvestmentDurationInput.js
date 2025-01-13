import React from "react";

const InvestmentDurationInput = ({ onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label>
        Investment Duration (years):
        <input
          type="number"
          placeholder="Enter duration"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default InvestmentDurationInput;
