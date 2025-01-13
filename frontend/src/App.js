import React from "react";
import Header from "./components/header/Header";
import MutualFunds from "./components/MutualFundTicker";

import "./styles/App.css";

const App = () => {
  return (
    <div>
      <Header />
      <MutualFunds />
    </div>
  );
};

export default App;
