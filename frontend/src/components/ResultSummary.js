import React from 'react';

// TODO: Format commas for the reciept
const formatAmount = (amount) => {
  return `$${amount.toFixed(2)}`;
};

const formatEarnings = (earnings) => {
  return earnings < 0 ? `-$${Math.abs(earnings).toFixed(2)}` : `$${earnings.toFixed(2)}`;
};

const ResultSummary = ({
  initialInvestment,
  investmentDuration,
  riskFreeRate,
  mutualFundBeta,
  earnings,
  totalBalance,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Result Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Initial Investment:</span>
          <span className="text-gray-800 dark:text-white">{formatAmount(initialInvestment)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Investment Duration:</span>
          <span className="text-gray-800 dark:text-white">{`${investmentDuration} years`}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Risk-Free Rate:</span>
          <span className="text-gray-800 dark:text-white">{`${riskFreeRate}%`}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Mutual Fund Beta:</span>
          <span className="text-gray-800 dark:text-white">{mutualFundBeta}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Earnings:</span>
          <span className="text-gray-800 dark:text-white">{formatEarnings(earnings)}</span>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex justify-between">
          <span className="font-semibold text-lg text-gray-600 dark:text-gray-300">Total Balance:</span>
          <span className="text-xl font-bold text-green-600 dark:text-green-400">{formatAmount(totalBalance)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
