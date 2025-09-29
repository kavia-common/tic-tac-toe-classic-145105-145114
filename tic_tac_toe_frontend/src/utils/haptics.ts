import { Platform } from 'react-native';

// PUBLIC_INTERFACE
export function lightHaptic(): void {
  /** Attempts to provide a subtle feedback; no-op on unsupported platforms */
  try {
    // We keep it as a no-op by default; can integrate expo-haptics in future without changing public API.
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      // Placeholder hook for future integration.
    }
  } catch {
    // swallow
  }
}
