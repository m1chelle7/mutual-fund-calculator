import React, { useState } from "react";

const InitialInvestmentInput = ({ onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9.]/g, "");

    if (inputValue) {
      let numberValue = parseFloat(inputValue.replace(/,/g, ""));
      if (!isNaN(numberValue)) {
        inputValue = numberValue.toLocaleString();
      }
    }

    setValue(inputValue);

    if (inputValue !== "") {
      onChange(Number(inputValue.replace(/,/g, "")));
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
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300">
          $
        </span>
        <input
          id="initial-investment"
          type="text"
          value={value}
          placeholder="Enter amount"
          onChange={handleChange}
          className="pl-8 mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-green-500"
        />
      </div>
    </div>
  );
};

export default InitialInvestmentInput;
