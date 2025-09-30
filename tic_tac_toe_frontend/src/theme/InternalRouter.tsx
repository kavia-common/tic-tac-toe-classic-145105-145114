import React from 'react';
import { RouteName } from './routerTypes';

type RouterCtx = {
  route: RouteName;
  navigate: (to: RouteName) => void;
  goBack: () => void;
};

const Ctx = React.createContext<RouterCtx | null>(null);

// PUBLIC_INTERFACE
export function useRouter() {
  /** Hook to access the internal lightweight router. */
  const c = React.useContext(Ctx);
  if (!c) throw new Error('useRouter must be used within InternalRouter');
  return c;
}

// PUBLIC_INTERFACE
export const InternalRouter: React.FC<React.PropsWithChildren> = ({ children }) => {
  /** Simple in-memory router supporting navigate and goBack for 3 routes. */
  const [stack, setStack] = React.useState<RouteName[]>(['Home']);
  const route = stack[stack.length - 1];

  const navigate = React.useCallback((to: RouteName) => {
    setStack(prev => [...prev, to]);
  }, []);

  const goBack = React.useCallback(() => {
    setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  return <Ctx.Provider value={{ route, navigate, goBack }}>{children}</Ctx.Provider>;
};
