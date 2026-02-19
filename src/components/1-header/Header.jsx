import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './header.css';

const Header = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="flex">
      {/* Menu Button (hamburger) */}
      <button
        onClick={() => setShowModal(true)}
        className="icon-button menu flex"
        aria-label="Open menu"
      >
        <i className="fa-solid fa-bars" />
      </button>

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
        <div className="fixed" role="dialog" aria-modal="true" aria-label="Navigation menu" onKeyDown={(e) => { if (e.key === 'Escape') setShowModal(false); }}>
          <ul className="modal">
            <li>
              <button
                className="icon-close"
                onClick={() => setShowModal(false)}
                aria-label="Close menu"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </li>
            <li><a href="#up" onClick={() => setShowModal(false)}>{t('header.home')}</a></li>
            <li><a href="#projects" onClick={() => setShowModal(false)}>{t('header.projects')}</a></li>
            <li><a href="#resume" onClick={() => setShowModal(false)}>{t('header.resume')}</a></li>
            <li><a href="#contact" onClick={() => setShowModal(false)}>{t('header.contact')}</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
