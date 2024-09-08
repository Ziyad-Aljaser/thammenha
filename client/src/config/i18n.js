// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/home_translation.json';
import arTranslation from './locales/ar/home_translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
  },
  lng: 'ar', // default language
  fallbackLng: 'ar', // fallback language if key is missing
  interpolation: {
    escapeValue: false, // React already protects from XSS
  },
});

export default i18n;
