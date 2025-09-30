/**
 * Lightweight Nav type placeholder for internal router usage.
 * Kept for potential compatibility; main types live in theme/routerTypes.
 */
export type Nav = {
  navigate: (route: 'Home' | 'Game' | 'Settings') => void;
  goBack?: () => void;
};
