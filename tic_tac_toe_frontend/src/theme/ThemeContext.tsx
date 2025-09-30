import React, { createContext, useContext, useMemo } from 'react';
import { OceanProfessionalTheme, AppTheme } from './theme';

// PUBLIC_INTERFACE
export const useTheme = (): AppTheme => {
  /** Hook to access the Ocean Professional theme instance. */
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};

const ThemeContext = createContext<AppTheme | null>(null);

// PUBLIC_INTERFACE
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  /** ThemeProvider supplying Ocean Professional theme and design tokens. */
  const theme = useMemo(() => OceanProfessionalTheme, []);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
