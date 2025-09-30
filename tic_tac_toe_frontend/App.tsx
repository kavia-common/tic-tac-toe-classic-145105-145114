import React, { memo, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/theme/ThemeContext';
import { InternalRouter, useRouter } from './src/theme/InternalRouter';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { NavLike } from './src/theme/routerTypes';

/**
 * RouterOutlet decides which screen to render based on the internal router state.
 * It also constructs a stable NavLike object for each target, avoiding per-render
 * allocations where possible.
 * Future: if deep linking or more routes are added, keep this switch pure and memoized.
 */
const RouterOutlet = memo(function RouterOutlet() {
  const { route, navigate, goBack } = useRouter();
  const navHome = useMemo<NavLike>(() => ({ navigate }), [navigate]);
  const navWithBack = useMemo<NavLike>(() => ({ navigate, goBack }), [navigate, goBack]);

  if (route === 'Home') return <HomeScreen navigation={navHome} />;
  if (route === 'Game') return <GameScreen navigation={navWithBack} />;
  return <SettingsScreen navigation={navWithBack} />;
});

// PUBLIC_INTERFACE
export default function App() {
  /** App root with ThemeProvider and InternalRouter. */
  return (
    <ThemeProvider>
      <InternalRouter>
        <StatusBar style="dark" />
        <RouterOutlet />
      </InternalRouter>
    </ThemeProvider>
  );
}
