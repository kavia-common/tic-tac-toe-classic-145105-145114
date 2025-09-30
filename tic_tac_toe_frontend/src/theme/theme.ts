import { Colors, Gradients } from './colors';

export type AppTheme = {
  /** Theme display name. */
  name: string;
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
};

export const OceanProfessionalTheme: AppTheme = {
  name: 'Ocean Professional',
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
};
