import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './header.css';

const Header = () => {
  const { t } = useTranslation();
  const [showModal, setshowModal] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

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
          type="button"
          className="icon-button mode flex"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <i className={isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} aria-hidden />
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
