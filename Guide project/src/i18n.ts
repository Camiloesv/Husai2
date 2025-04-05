import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationFR from './locales/fr/translation.json';

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
  fr: { translation: translationFR },
};

i18n
  .use(LanguageDetector) // detecta idioma del navegador automáticamente
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // idioma por defecto si no encuentra el idioma del usuario
    interpolation: {
      escapeValue: false, // React ya maneja esto
    },
    detection: {
      order: ['localStorage', 'navigator'], // prioriza el idioma en localStorage
      caches: ['localStorage'],
    },
  });

export default i18n;
