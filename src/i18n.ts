import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import globalEn from './locales/en/global.json';
import globalEs from './locales/es/global.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                global: globalEn
            },
            es: {
                global: globalEs
            }
        },
        fallbackLng: 'en',
        defaultNS: 'global',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;