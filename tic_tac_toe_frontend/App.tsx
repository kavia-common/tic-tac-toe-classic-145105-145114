import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation';
import { SettingsProvider } from './src/state/SettingsContext';
import { StatsProvider } from './src/state/StatsContext';

/**
 * Root App component
 * Wires up providers and the navigation container.
 */
export default function App() {
  return (
    <SettingsProvider>
      <StatsProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </StatsProvider>
    </SettingsProvider>
  );
}
