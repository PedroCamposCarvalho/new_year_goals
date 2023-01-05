import React from 'react';
import { LanguageProvider } from '@app/hooks/language';

const AppProvider: React.FC = ({ children }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

export default AppProvider;
