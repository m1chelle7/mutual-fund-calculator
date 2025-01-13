import React from 'react';
import Header from './components/header/Header';
import MutualFunds from './components/MutualFundTicker';
import HeroSection from './components/HeroSection';


const App = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <MutualFunds />
    </div>
  );
};

export default App;
