import { Colors, Gradients } from './colors';

export type AppTheme = {
  /** Theme display name. */
  name: string;
  /** Unique key for persistence and selection. */
  key: 'ocean' | 'royalDark';
  /** Color palette. */
  colors: typeof Colors;
  /** Linear gradients. */
  gradients: typeof Gradients;
  /** Border radius scale. */
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  /** Spacing utility, multiples of 8. */
  spacing: (factor?: number) => number;
  /** Cross-platform shadow presets. */
  shadow: {
    sm: Record<string, unknown>;
    md: Record<string, unknown>;
    lg: Record<string, unknown>;
  };
  /** Typography scale for consistent text styles. */
  typography: {
    title: { fontSize: number; fontWeight: '800' | '900'; letterSpacing?: number };
    subtitle: { fontSize: number; fontWeight: '600' | '700'; letterSpacing?: number };
    body: { fontSize: number; fontWeight: '400' | '500' | '600'; letterSpacing?: number };
    button: { fontSize: number; fontWeight: '700' | '800'; letterSpacing?: number };
  };
  /** Motion tokens for durations/easings to keep animations coherent. */
  motion: {
    fast: number;
    normal: number;
    slow: number;
  };
};

export const OceanProfessionalTheme: AppTheme = {
  name: 'Ocean Professional',
  key: 'ocean',
  colors: Colors,
  gradients: Gradients,
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  spacing: (factor = 1) => 8 * factor,
  shadow: {
    sm: {
      shadowColor: Colors.shadow,
      shadowOpacity: 0.12,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    md: {
      shadowColor: Colors.shadow,
      shadowOpacity: 0.16,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
    lg: {
      shadowColor: Colors.shadow,
      shadowOpacity: 0.2,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 6,
    },
  },
  typography: {
    title: { fontSize: 22, fontWeight: '900', letterSpacing: 0.3 },
    subtitle: { fontSize: 14, fontWeight: '700', letterSpacing: 0.2 },
    body: { fontSize: 14, fontWeight: '500' },
    button: { fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  },
  motion: {
    fast: 120,
    normal: 220,
    slow: 380,
  },
};

/**
 * Royal Dark theme: deep indigo primary, royal purple secondary,
 * dark backgrounds and high-contrast text. Gradients adapted for dark UI.
 */
const DarkColors = {
  primary: '#4F46E5', // Indigo-600
  secondary: '#A855F7', // Purple-500
  background: '#0b1020',
  surface: '#111827',
  text: '#F9FAFB',
  mutedText: '#9CA3AF',
  border: '#1F2937',
  error: '#F87171',
  success: '#34D399',
  shadow: 'rgba(0,0,0,0.6)',
} as const;

const DarkGradients = {
  header: ['#0b1020', '#1f2937'],
  surface: ['#0f172a', '#111827'],
  primarySoft: ['#1d1f3a', '#0b1020'],
} as const;

export const RoyalDarkTheme: AppTheme = {
  name: 'Royal Dark',
  key: 'royalDark',
  colors: DarkColors as unknown as typeof Colors,
  gradients: DarkGradients as unknown as typeof Gradients,
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  spacing: (factor = 1) => 8 * factor,
  shadow: {
    sm: {
      shadowColor: DarkColors.shadow,
      shadowOpacity: 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    md: {
      shadowColor: DarkColors.shadow,
      shadowOpacity: 0.35,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
    lg: {
      shadowColor: DarkColors.shadow,
      shadowOpacity: 0.45,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 6,
    },
  },
  typography: {
    title: { fontSize: 22, fontWeight: '900', letterSpacing: 0.3 },
    subtitle: { fontSize: 14, fontWeight: '700', letterSpacing: 0.2 },
    body: { fontSize: 14, fontWeight: '500' },
    button: { fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  },
  motion: {
    fast: 120,
    normal: 220,
    slow: 380,
  },
};

/**
 * PUBLIC_INTERFACE
 * Registry of available themes keyed by persistence key.
 */
export const Themes = {
  ocean: OceanProfessionalTheme,
  royalDark: RoyalDarkTheme,
} as const;

export type ThemeKey = keyof typeof Themes;
