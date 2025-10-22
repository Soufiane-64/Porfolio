import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './languageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const languages = useMemo(() => ([
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ]), []);

  const codeToFlagCdn = (code) => {
    const base = (code || '').split('-')[0];
    switch (base) {
      case 'en': return 'gb';
      case 'de': return 'de';
      case 'fr': return 'fr';
      case 'es': return 'es';
      default: return base || 'un';
    }
  };

  const baseLang = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
  const currentLanguage = languages.find(l => l.code === baseLang) || languages[0];

  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const toggle = () => setOpen(v => !v);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className={`language-switcher ${open ? 'open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="current-language"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
      >
        {(() => {
          const fc = codeToFlagCdn(currentLanguage.code);
          const src = `https://flagcdn.com/24x18/${fc}.png`;
          const src2x = `https://flagcdn.com/48x36/${fc}.png`;
          return (
            <img className="flag-img" src={src} srcSet={`${src2x} 2x`} width="24" height="18" alt={`${currentLanguage.name} flag`} />
          );
        })()}
      </button>
      {open && (
        <div className="language-dropdown" role="listbox">
          {languages.map((lang) => {
            const isActive = baseLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`language-option ${isActive ? 'active' : ''}`}
                role="option"
                aria-selected={isActive}
              >
                {(() => {
                  const fc = codeToFlagCdn(lang.code);
                  const src = `https://flagcdn.com/24x18/${fc}.png`;
                  const src2x = `https://flagcdn.com/48x36/${fc}.png`;
                  return (
                    <img className="flag-img" src={src} srcSet={`${src2x} 2x`} width="24" height="18" alt={`${lang.name} flag`} />
                  );
                })()}
                <span className="language-name">{lang.name}</span>
                {isActive && <i className="fa-solid fa-check" aria-hidden />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

