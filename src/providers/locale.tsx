import React, { useState, useEffect } from 'react';
import i18n from 'i18next';

export interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

export const LocaleContext = React.createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {}
});

function sanitizeLocale(raw: string | null | undefined) {
  if (!raw) {
    return;
  }

  return raw.split('-')[0];
}

export function LocaleProvider({ children }: { children: React.ReactNode}) {
  const [locale, setLocale] = useState<string>(sanitizeLocale(i18n.language) || 'en');

  useEffect(() => {
    i18n.on('languageChanged', () => setLocale(sanitizeLocale(i18n.language) || 'en'));
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function setLocale(language: string) {
  if(i18n.language === language) {
    return;
  }
  i18n.changeLanguage(language);
}
