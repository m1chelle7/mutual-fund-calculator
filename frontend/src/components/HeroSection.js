import React from "react";
import HeroImage from "../images/MutualFund.png";

const HeroSection = () => {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      <div className="hero-overlay">
        <h1>Mutual Fund Predictor</h1>
        <p>
        Take charge of your financial future. Predict, compare, and invest smarter with our Mutual Fund Calculator.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
