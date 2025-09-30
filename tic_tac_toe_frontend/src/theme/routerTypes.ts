/**
 * RouteName defines all valid route keys used by the InternalRouter and screens.
 */
export type RouteName = 'Home' | 'Game' | 'Settings';

/**
 * NavLike is a minimal navigation interface used by screens to request route changes.
 * It maps to the InternalRouter implementation and keeps screen code decoupled.
 */
export type NavLike = {
  navigate: (route: RouteName) => void;
  goBack?: () => void;
};
