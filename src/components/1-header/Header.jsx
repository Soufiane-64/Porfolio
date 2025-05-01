import React, { useState, useEffect } from 'react';
import './header.css';

/**
 * Header component that contains the navigation bar
 * Includes About, Articles & Projects, Speaking, Contact buttons
 * and a light/dark mode toggle
 */
const Header = () => {
  const [lightMode, setLightMode] = useState(false),
    // Toggle between light and dark mode
    toggleTheme = () => {
      setLightMode(!lightMode);
      document.body.classList.toggle('light');
      // @ts-ignore
      localStorage.setItem('lightMode', !lightMode);
    };

  // Check for saved user preference on component mount
  useEffect(() => {
    const savedLightMode = localStorage.getItem('lightMode') === 'true';
    setLightMode(savedLightMode);
    if (savedLightMode) {
      document.body.classList.add('light');
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <h1>Portfolio</h1>
      </div>

      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Articles & Projects</a></li>
          <li><a href="#speaking">Speaking</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <button
          className={`theme-toggle ${lightMode ? 'light-mode' : 'dark-mode'}`} 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {lightMode ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
};

export default Header;