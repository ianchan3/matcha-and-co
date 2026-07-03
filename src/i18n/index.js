import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.js';
import vi from './vi.js';
import zh from './zh.js';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
    zh: { translation: zh },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;