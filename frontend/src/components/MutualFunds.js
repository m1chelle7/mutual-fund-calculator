import React, { useEffect, useState } from 'react';

const MutualFunds = () => {
  const [mutualFunds, setMutualFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Mutual Funds</h1>
      <ul>
        {mutualFunds.map((fund) => (
          <li key={fund.ticker}>
            <strong>{fund.name}</strong> ({fund.ticker})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MutualFunds;
