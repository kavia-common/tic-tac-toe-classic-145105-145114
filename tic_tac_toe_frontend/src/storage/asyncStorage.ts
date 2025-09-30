//
// AsyncStorage helpers
//

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  settings: 'ttt_settings_v1',
  stats: 'ttt_stats_v1',
};

export type Settings = {
  mode: 'PVP' | 'AI';
  aiDifficulty: 'EASY' | 'NORMAL';
  sound: boolean;
  haptics: boolean;
  animations: boolean;
  firstPlayer: 'X' | 'O' | 'AUTO';
};

export type Stats = {
  totalGames: number;
  xWins: number;
  oWins: number;
  draws: number;
  lastWinner: 'X' | 'O' | 'DRAW' | null;
};

export async function saveJSON<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // fail silently for MVP, could add logging
  }
}

export async function loadJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
