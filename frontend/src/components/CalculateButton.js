import React from "react";

const CalculateButton = ({ handleSubmit }) => {
  return (
    <button type="submit" onClick={handleSubmit}>
      Calculate Future Value
    </button>
  );
};

export default CalculateButton;
