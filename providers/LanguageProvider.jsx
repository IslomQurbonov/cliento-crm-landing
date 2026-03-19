'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('uz');

  // Cookie dan tilni o'qish
  useEffect(() => {
    const saved = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cliento_lang='));
    if (saved) {
      const val = saved.split('=')[1];
      if (['uz', 'ru', 'en'].includes(val)) {
        setLanguageState(val);
      }
    }
  }, []);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    // Cookie ga saqlash (1 yil)
    document.cookie = `cliento_lang=${lang}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
