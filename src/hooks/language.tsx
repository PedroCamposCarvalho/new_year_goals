import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface ILanguage {
  name: string;
}

interface LanguageProvider {
  selectedLanguage: string;
  changeLanguage: (newLanguage: string) => void;
}

interface BaseLayoutProps {
  children?: React.ReactNode;
}

const LanguageContext = createContext<LanguageProvider>({} as LanguageProvider);

export const LanguageProvider: React.FC<BaseLayoutProps> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  const changeLanguage = useCallback((newLanguage: string) => {
    setSelectedLanguage(newLanguage);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguageContext(): LanguageProvider {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within an LanguageProvider');
  }
  return context;
}
