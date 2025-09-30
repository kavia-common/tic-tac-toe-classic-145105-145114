import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  SETTINGS: '@ttt:settings',
  SCORE: '@ttt:score',
};

export type ThemeKey = 'ocean' | 'royalDark' | 'purpleDream';

export type SettingsState = {
  vsAI: boolean;
  aiLevel: 'easy' | 'medium' | 'hard';
  playerStarts: boolean; // X if true
  theme: ThemeKey;
};

export type ScoreState = {
  x: number;
  o: number;
  draws: number;
};

/**
 * Persist settings to AsyncStorage. Errors are swallowed intentionally to avoid crashing UX.
 */
export async function saveSettings(settings: SettingsState): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // no-op
  }
}

/**
 * Load settings from AsyncStorage, returning null if not present or invalid.
 */
export async function loadSettings(): Promise<SettingsState | null> {
  try {
    const data = await AsyncStorage.getItem(KEYS.SETTINGS);
    return data ? (JSON.parse(data) as SettingsState) : null;
  } catch {
    return null;
  }
}

/**
 * Persist score to AsyncStorage. Errors are swallowed intentionally to avoid crashing UX.
 */
export async function saveScore(score: ScoreState): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.SCORE, JSON.stringify(score));
  } catch {
    // no-op
  }
}

/**
 * Load score from AsyncStorage, returning null if not present or invalid.
 */
export async function loadScore(): ScoreState | null | Promise<ScoreState | null> {
  try {
    const data = await AsyncStorage.getItem(KEYS.SCORE);
    return data ? (JSON.parse(data) as ScoreState) : null;
  } catch {
    return null;
  }
}

export const defaultSettings: SettingsState = {
  vsAI: true,
  aiLevel: 'easy',
  playerStarts: true,
  theme: 'ocean',
};

export const defaultScore: ScoreState = { x: 0, o: 0, draws: 0 };
