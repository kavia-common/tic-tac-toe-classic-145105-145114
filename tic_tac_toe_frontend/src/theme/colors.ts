/**
 * Core color palette for the Ocean Professional theme.
 */
export const Colors = {
  primary: '#2563EB', // Blue
  secondary: '#F59E0B', // Amber
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  mutedText: '#6b7280',
  border: '#e5e7eb',
  error: '#EF4444',
  success: '#10B981',
  shadow: 'rgba(0,0,0,0.1)',
} as const;

/**
 * Linear gradient tokens for surfaces and headers.
 */
export const Gradients = {
  header: ['#F9FAFB', '#EAF2FF'],
  surface: ['#FFFFFF', '#F7FAFF'],
  primarySoft: ['#e0ecff', '#ffffff'],
} as const;
