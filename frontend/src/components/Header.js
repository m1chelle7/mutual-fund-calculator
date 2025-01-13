import React from "react";

const toggleDarkMode = () => {
  document.body.classList.toggle("dark"); // Toggles the 'dark' class on the <body>
};

const Header = () => {
  return (
    <header className="header">
      <div className="logo">G5</div>
      <div className="header-controls">
        <input
          type="text"
          placeholder="Need anything?"
          className="search-input"
        />
        <button className="login">Log in</button>
        <button className="register">Register</button>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          🌙
        </button>
      </div>
    </header>
  );
};

export default Header;
