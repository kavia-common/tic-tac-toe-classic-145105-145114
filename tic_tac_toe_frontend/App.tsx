import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/theme/ThemeContext';
import { InternalRouter, useRouter } from './src/theme/InternalRouter';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import SettingsScreen from './src/screens/SettingsScreen';

type RouteName = 'Home' | 'Game' | 'Settings';
type NavLike = {
  navigate: (route: RouteName) => void;
  goBack?: () => void;
};

function RouterOutlet() {
  const { route, navigate, goBack } = useRouter();
  const navHome: NavLike = { navigate: (r) => navigate(r) };
  const navWithBack: NavLike = { navigate: (r) => navigate(r), goBack };
  if (route === 'Home') return <HomeScreen navigation={navHome} />;
  if (route === 'Game') return <GameScreen navigation={navWithBack} />;
  return <SettingsScreen navigation={navWithBack} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <InternalRouter>
        <StatusBar style="dark" />
        <RouterOutlet />
      </InternalRouter>
    </ThemeProvider>
  );
}
