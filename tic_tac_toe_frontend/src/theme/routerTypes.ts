export type RouteName = 'Home' | 'Game' | 'Settings';

export type NavLike = {
  navigate: (route: RouteName) => void;
  goBack?: () => void;
};
