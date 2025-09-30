import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AppTheme, Themes, ThemeKey as ThemeKeyFromTheme } from './theme';
import { defaultSettings, loadSettings, saveSettings } from '../utils/storage';

type ThemeContextValue = {
  theme: AppTheme;
  // PUBLIC_INTERFACE
  changeTheme: (key: ThemeKeyFromTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// PUBLIC_INTERFACE
export const useTheme = (): AppTheme => {
  /** Hook to access the current theme instance. */
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx.theme;
};

// PUBLIC_INTERFACE
export const useThemeController = () => {
  /** Hook to access theme controller: theme object and changeTheme action. */
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeController must be used within ThemeProvider');
  }
  return ctx;
};

// PUBLIC_INTERFACE
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  /** ThemeProvider supplying dynamic theme with persistence (AsyncStorage). */
  const [key, setKey] = useState<ThemeKeyFromTheme>(defaultSettings.theme as ThemeKeyFromTheme);

  // Load persisted theme once
  useEffect(() => {
    (async () => {
      const stored = await loadSettings();
      if (stored?.theme && Themes[stored.theme as ThemeKeyFromTheme]) {
        setKey(stored.theme as ThemeKeyFromTheme);
      }
    })();
  }, []);

  const changeTheme = React.useCallback((newKey: ThemeKeyFromTheme) => {
    if (!Themes[newKey]) return;
    setKey(newKey);
    // Persist into settings, merging with existing
    (async () => {
      const current = (await loadSettings()) ?? defaultSettings;
      const next = { ...current, theme: newKey };
      await saveSettings(next);
    })();
  }, []);

  const theme = useMemo(() => Themes[key], [key]);

  const value = useMemo<ThemeContextValue>(() => ({ theme, changeTheme }), [theme, changeTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
