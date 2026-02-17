import './hero.css';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import ThreeScene from '../ThreeScene/ThreeScene';

const Hero = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const rootRef = useRef(null);
  const avatarRef = useRef(null);


  return (
    <section className="hero flex" ref={rootRef}>
      <div className="left-section">
        <div className="parent-avatar flex">
          <img
            ref={avatarRef}
            src={isDarkMode ? './avatar_black.png' : './avatar_white.png'}
            className="avatar"
            alt="Soufiane Hammagi — avatar"
          />
          <i className="fa-solid fa-circle-check icon-verified" aria-hidden />
        </div>

        <h1 className="title">
          <span className="gradient-text">{t('hero.title')}</span>
        </h1>

        <p className="sub-title">
          {t('hero.description')}
        </p>

        <div className="controls flex">
          <a className="btn primary" href="#projects" aria-label="See projects">{t('hero.viewProjects')}</a>
          <a className="btn outline" href="/SoufianeHammagiResume.pdf" download aria-label="Download CV">{t('hero.downloadCV')}</a>
        </div>

        <div className="all-icons flex" role="navigation" aria-label="social links">
          <a href="https://www.linkedin.com/in/soufiane-hammagi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-link">
            <i className="fa-brands fa-linkedin icon" />
          </a>
          <a href="https://github.com/Soufiane-64" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-link">
            <i className="fa-brands fa-github icon" />
          </a>
          <a href="https://x.com/SoufianeHammagi" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="icon-link">
            <i className="fa-brands fa-x-twitter icon" />
          </a>
          <a href="https://www.instagram.com/soufiane.64/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="icon-link">
            <i className="fa-brands fa-instagram icon" />
          </a>
        </div>
      </div>

      <div className="right-section right-section-3d" aria-hidden="true">
        <ThreeScene isDarkMode={isDarkMode} className="hero-three-canvas" />
      </div>
    </section>
  );
};

export default Hero;