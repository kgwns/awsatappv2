import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import {enUs, sp} from 'src/assets/locales';

export const i18n = i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    enUs,
    sp,
  },
  fallbackLng: ['enUs'],
  keySeparator: '.',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});
