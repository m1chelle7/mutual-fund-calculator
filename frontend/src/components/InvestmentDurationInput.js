// TODO: Can maybe create a component with input and just pass in values to recycle
import React from "react";

const InvestmentDurationInput = ({ onChange }) => {
  const handleChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 1) {
      onChange(value);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="investment-duration"
        className="block text-sm font-medium text-gray-700"
      >
        Investment Duration (years):
      </label>
      <input
        id="investment-duration"
        type="number"
        placeholder="Enter duration"
        onChange={handleChange}
        min="1"
        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default InvestmentDurationInput;
