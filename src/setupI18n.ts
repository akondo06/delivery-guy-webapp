import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    load: 'languageOnly', // def: all
    fallbackLng: 'en',
    // debug: true,

    ns: ['translation', 'validation'],

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
