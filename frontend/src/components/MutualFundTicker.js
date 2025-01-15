import React, { useEffect, useState } from "react";
import { fetchMutualFunds } from "../services/mutual_funds_api"; 

const MutualFunds = ({ onSelectFund }) => {
  const [mutualFunds, setMutualFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFund, setSelectedFund] = useState("");

  useEffect(() => {
    const getMutualFunds = async () => {
      try {
        const data = await fetchMutualFunds();
        setMutualFunds(data);
      } catch (error) {
        setError("Error fetching mutual funds.");
      } finally {
        setLoading(false);
      }
    };

    getMutualFunds();
  }, []);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedFund(selected);
    onSelectFund(selected);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (mutualFunds.length === 0) {
    return <div>No mutual funds available.</div>;
  }

  return (
    <div>
      <h1>Mutual Funds</h1>
      <select
        value={selectedFund}
        onChange={handleChange}
        disabled={mutualFunds.length === 0}
      >
        <option value="">Select a Mutual Fund</option>
        {mutualFunds.map((fund) => (
          <option key={fund.ticker} value={fund.ticker}>
            {fund.name} ({fund.ticker})
          </option>
        ))}
      </select>

      {selectedFund && (
        <div>
          <h2>Selected Fund:</h2>
          <p>
            {mutualFunds.find((fund) => fund.ticker === selectedFund)?.name}
          </p>
          <p>{selectedFund}</p>
        </div>
      )}
    </div>
  );
};

export default MutualFunds;
