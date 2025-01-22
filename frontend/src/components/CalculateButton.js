import React from "react";

const CalculateButton = ({ handleSubmit }) => {
  return (
    <button
      type="submit"
      onClick={handleSubmit}
      className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-colors duration-200"
    >
      Calculate Future Value
    </button>
  );
};

export default CalculateButton;
