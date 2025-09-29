type Settings = {
  sound: boolean;
  firstPlayer: 'X' | 'O';
  aiSymbol: 'X' | 'O';
};

// PUBLIC_INTERFACE
export async function loadSettings(): Promise<Settings | null> {
  /** Stub: in a real app, use AsyncStorage or SecureStore. Returning null keeps it session-only. */
  return null;
}

// PUBLIC_INTERFACE
export async function saveSettings(): Promise<void> {
  /** Stub: no-op for now */
  return;
}
