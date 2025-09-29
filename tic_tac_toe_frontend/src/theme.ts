export const theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    shadow: 'rgba(17, 24, 39, 0.06)',
  },
  layout: {
    radius: 14,
    radiusLg: 20,
    spacing: 16,
    spacingSm: 10,
    spacingLg: 24,
    gridGap: 10,
    headerHeight: 68,
  },
  shadow: {
    card: {
      shadowColor: 'rgba(17, 24, 39, 0.2)',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 20,
      elevation: 6,
    },
    soft: {
      shadowColor: 'rgba(17, 24, 39, 0.12)',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3,
    },
  },
};

export const gradient = {
  from: 'rgba(37, 99, 235, 0.08)',
  to: 'rgba(249, 250, 251, 1)',
};

export type GameMode = 'HUMAN' | 'AI';

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
};
