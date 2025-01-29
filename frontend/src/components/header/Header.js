import React, { useState } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <header
      className={`flex justify-between items-center p-4 bg-green-600 dark:bg-gray-800 text-white`}
    >
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-lg">Goldman Sachs ELS</span>
      </div>

      <h1 className="text-2xl font-semibold flex-grow text-center">
        Mutual Fund Calculator
      </h1>

      <button
        onClick={toggleDarkMode}
        className="bg-green-800 dark:bg-gray-700 transition-colors rounded-full p-2 text-sm font-medium min-w-[100px]"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
