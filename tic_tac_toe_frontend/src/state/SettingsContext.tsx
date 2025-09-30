import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadJSON, saveJSON, storageKeys, Settings } from '../storage/asyncStorage';

// PUBLIC_INTERFACE
export type SettingsContextValue = {
  settings: Settings;
  setSettings: (s: Partial<Settings>) => void;
  resetDefaults: () => void;
};

const defaultSettings: Settings = {
  mode: 'AI',
  aiDifficulty: 'EASY',
  sound: true,
  haptics: true,
  animations: true,
  firstPlayer: 'AUTO',
};

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  setSettings: () => {},
  resetDefaults: () => {},
});

/**
 * PUBLIC_INTERFACE
 * SettingsProvider
 * Provides app-level settings with AsyncStorage persistence.
 */
export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [settings, setSettingsState] = useState<Settings>(defaultSettings);

  useEffect(() => {
    loadJSON<Settings>(storageKeys.settings, defaultSettings).then(setSettingsState);
  }, []);

  const setSettings = useCallback((partial: Partial<Settings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...partial };
      saveJSON(storageKeys.settings, next);
      return next;
    });
  }, []);

  const resetDefaults = useCallback(() => {
    setSettingsState(defaultSettings);
    saveJSON(storageKeys.settings, defaultSettings);
  }, []);

  const value = useMemo(
    () => ({ settings, setSettings, resetDefaults }),
    [settings, setSettings, resetDefaults]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

// PUBLIC_INTERFACE
export function useSettings(): SettingsContextValue {
  /** Access settings context. */
  return useContext(SettingsContext);
}
