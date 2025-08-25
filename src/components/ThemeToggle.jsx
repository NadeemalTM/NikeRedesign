import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="theme-toggle-icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="theme-toggle-text">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
