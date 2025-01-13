import React, { useEffect, useState } from 'react';

const MutualFunds = () => {
  const [mutualFunds, setMutualFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFund, setSelectedFund] = useState('');

  useEffect(() => {
    const fetchMutualFunds = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/mutual-funds');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMutualFunds(data);
      } catch (error) {
        setError('Error fetching mutual funds');
      } finally {
        setLoading(false);
      }
    };

    fetchMutualFunds();
  }, []);

  const handleChange = (event) => {
    setSelectedFund(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
          <p>{mutualFunds.find(fund => fund.ticker === selectedFund)?.name}</p>
          <p>{selectedFund}</p>
        </div>
      )}
    </div>
  );
};

export default MutualFunds;
