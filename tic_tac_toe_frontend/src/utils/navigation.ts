/**
 * Lightweight Nav type placeholder for internal router usage.
 * Not using react-navigation; keep this file as a compatibility shim if imported.
 */
export type Nav = {
  navigate: (route: 'Home' | 'Game' | 'Settings') => void;
  goBack?: () => void;
};
