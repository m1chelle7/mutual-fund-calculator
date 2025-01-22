import React, { useEffect, useState } from "react";
import { fetchMutualFunds } from "../services/mutual_funds_api"; 

const MutualFunds = ({ onSelectFund }) => {
  const [mutualFunds, setMutualFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFund, setSelectedFund] = useState("");
  const [isOpen, setIsOpen] = useState(false); 

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

  const handleSelectFund = (fund) => {
    setSelectedFund(fund.ticker);
    onSelectFund(fund.ticker); 
    setIsOpen(false);  
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); 
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
      <label
        htmlFor="mutual-fund"
        className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
      >
        Mutual Fund:
      </label>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white dark:bg-gray-700 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {selectedFund
              ? mutualFunds.find((fund) => fund.ticker === selectedFund)?.name
              : "Select a Mutual Fund"}
            <svg
              className={`-mr-1 h-5 w-5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              {mutualFunds.map((fund) => (
                <button
                  key={fund.ticker}
                  onClick={() => handleSelectFund(fund)}
                  className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 text-left"
                  role="menuitem"
                >
                  {fund.name} ({fund.ticker})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* {selectedFund && (
        <div className="mt-4 text-gray-700 dark:text-gray-300">
          <h2 className="text-lg font-medium">Selected Fund:</h2>
          <p>
            {mutualFunds.find((fund) => fund.ticker === selectedFund)?.name}
          </p>
          <p>{selectedFund}</p>
        </div>
      )} */}
    </div>
  );
};

export default MutualFunds;
