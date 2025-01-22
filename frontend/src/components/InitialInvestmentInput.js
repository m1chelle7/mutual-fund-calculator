import React from "react";

const InitialInvestmentInput = ({ onChange }) => {
  const handleChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 0) {
      onChange(value);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="initial-investment"
        className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
      >
        Initial Investment:
      </label>
      <input
        id="initial-investment"
        type="number"
        placeholder="Enter amount"
        onChange={handleChange}
        min="0"
        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-green-500"
      />
    </div>
  );
};

export default InitialInvestmentInput;
