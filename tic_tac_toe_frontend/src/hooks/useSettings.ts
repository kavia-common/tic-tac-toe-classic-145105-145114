import { useEffect, useState, useCallback } from 'react';
import { defaultSettings, loadSettings, saveSettings, SettingsState } from '../utils/storage';

// PUBLIC_INTERFACE
export function useSettings() {
  /** Manage settings state with AsyncStorage persistence. */
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await loadSettings();
      if (stored) setSettings(stored);
      setReady(true);
    })();
  }, []);

  const update = useCallback(async (patch: Partial<SettingsState>) => {
    setSettings(prev => {
      const next = { ...prev, ...patch };
      saveSettings(next).catch(() => {});
      return next;
    });
  }, []);

  return { settings, setSettings: update, ready };
}
