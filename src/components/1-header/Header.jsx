import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './header.css';

const Header = () => {
  const { t } = useTranslation();
  const [showModal, setshowModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    } else {
      // Default to dark mode
      setIsDarkMode(true);
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');

    // Toggle the light class on the document element
    document.documentElement.classList.toggle('light', !newTheme);
  };

  return (
    <header className="flex">
      {/* Menu Button (hamburger) */}
      <button
        onClick={() => setshowModal(true)}
        className="icon-button menu flex"
      >
        <i className="fa-solid fa-bars" />
      </button>

      <div />

      {/* Nav Links */}
      <nav>
        <ul className="flex">
          <li><a href="#up">{t('header.home')}</a></li>
          <li><a href="#projects">{t('header.projects')}</a></li>
          <li><a href="#resume">{t('header.resume')}</a></li>
          <li><a href="#contact">{t('header.contact')}</a></li>
        </ul>
      </nav>

      {/* Language Switcher & Dark Mode Toggle */}
      <div className="header-actions flex">
        <LanguageSwitcher />
        <button
          className="icon-button mode flex"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <i className={isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />
        </button>
      </div>

      {/* Modal Menu */}
      {showModal && (
        <div className="fixed">
          <ul className="modal">
            <li className="border">
              <button
                className="icon-close"
                onClick={() => setshowModal(false)}
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </li>
            <li><a href="#up" onClick={() => setshowModal(false)}>{t('header.home')}</a></li>
            <li><a href="#projects" onClick={() => setshowModal(false)}>{t('header.projects')}</a></li>
            <li><a href="#resume" onClick={() => setshowModal(false)}>{t('header.resume')}</a></li>
            <li><a href="#contact" onClick={() => setshowModal(false)}>{t('header.contact')}</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
