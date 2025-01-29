import React from "react";

const CalculateButton = ({ handleSubmit }) => {
  return (
    <button
      type="button"
      onClick={handleSubmit}
      className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-800 transition-colors duration-200"
    >
      Calculate Future Value
    </button>
  );
};

export default CalculateButton;
