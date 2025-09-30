import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  SETTINGS: '@ttt:settings',
  SCORE: '@ttt:score',
};

export type SettingsState = {
  vsAI: boolean;
  aiLevel: 'easy' | 'medium' | 'hard';
  playerStarts: boolean; // X if true
  theme: 'ocean';
};

export type ScoreState = {
  x: number;
  o: number;
  draws: number;
};

export async function saveSettings(settings: SettingsState): Promise<void> {
  await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}

export async function loadSettings(): Promise<SettingsState | null> {
  const data = await AsyncStorage.getItem(KEYS.SETTINGS);
  return data ? (JSON.parse(data) as SettingsState) : null;
}

export async function saveScore(score: ScoreState): Promise<void> {
  await AsyncStorage.setItem(KEYS.SCORE, JSON.stringify(score));
}

export async function loadScore(): Promise<ScoreState | null> {
  const data = await AsyncStorage.getItem(KEYS.SCORE);
  return data ? (JSON.parse(data) as ScoreState) : null;
}

export const defaultSettings: SettingsState = {
  vsAI: true,
  aiLevel: 'easy',
  playerStarts: true,
  theme: 'ocean',
};

export const defaultScore: ScoreState = { x: 0, o: 0, draws: 0 };
