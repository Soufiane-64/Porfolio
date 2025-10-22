import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es }
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Fallback language if browser language is not supported
    supportedLngs: ['en', 'de', 'fr', 'es'], // Supported languages
    react: { useSuspense: false },
    interpolation: {
      escapeValue: false // React already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'], // Detection order
      caches: ['localStorage'], // Cache user language preference
      lookupLocalStorage: 'i18nextLng'
    }
  });

export default i18n;

