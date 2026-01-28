import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { resources } from './locales';

// Get saved language from localStorage or use system language
const getSavedLanguage = (): string | undefined => {
  try {
    const saved = localStorage.getItem('language-storage');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.state?.language;
    }
  } catch {
    // Ignore parse errors
  }
  return undefined;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(), // Use saved language if available
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;

// Re-export commonly used hooks and components
export { type LanguageCode, languages } from './locales';
export { I18nextProvider, Trans, useTranslation } from 'react-i18next';
