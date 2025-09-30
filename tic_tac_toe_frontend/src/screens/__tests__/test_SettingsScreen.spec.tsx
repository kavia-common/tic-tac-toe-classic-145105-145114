import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../SettingsScreen';
import { ThemeProvider } from '../../theme/ThemeContext';
import * as SettingsHook from '../../hooks/useSettings';

type Nav = { navigate: (r: 'Home' | 'Game' | 'Settings') => void; goBack: () => void };
const nav: Nav = { navigate: jest.fn(), goBack: jest.fn() };

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.spyOn(SettingsHook, 'useSettings').mockReturnValue({
      settings: { vsAI: true, aiLevel: 'easy', playerStarts: true, theme: 'ocean' },
      setSettings: jest.fn(),
      ready: true,
    } as unknown as ReturnType<typeof SettingsHook.useSettings>);
  });

  afterEach(() => jest.clearAllMocks());

  test('can select Purple Dream theme', () => {
    const { getByA11yLabel } = render(
      <ThemeProvider>
        <SettingsScreen navigation={nav} />
      </ThemeProvider>
    );

    const purple = getByA11yLabel('Select Purple Dream theme');
    fireEvent.press(purple);
    const { setSettings } = SettingsHook.useSettings();
    expect(setSettings).toHaveBeenCalledWith({ theme: 'purpleDream' });
  });

  test('toggles vsAI and playerStarts', () => {
    const { getAllByA11yRole } = render(
      <ThemeProvider>
        <SettingsScreen navigation={nav} />
      </ThemeProvider>
    );

    const switches = getAllByA11yRole('switch');
    expect(switches.length).toBe(2);
  });
});
