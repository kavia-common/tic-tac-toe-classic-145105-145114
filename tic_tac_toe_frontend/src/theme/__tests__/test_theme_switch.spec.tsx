import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider, useTheme, useThemeController } from '../ThemeContext';

const ReadPrimary: React.FC<{ onPrimary: (color: string) => void }> = ({ onPrimary }) => {
  const theme = useTheme();
  React.useEffect(() => {
    onPrimary(theme.colors.primary);
  }, [onPrimary, theme.colors.primary]);
  return null;
};

const ControllerProbe: React.FC<{ onReady: (change: (k: 'ocean' | 'royalDark' | 'purpleDream') => void) => void }> = ({ onReady }) => {
  const { changeTheme } = useThemeController();
  React.useEffect(() => {
    onReady(changeTheme);
  }, [changeTheme, onReady]);
  return null;
};

describe('Theme switching', () => {
  test('switching to Purple Dream applies purple primary color', async () => {
    let change: (k: 'ocean' | 'royalDark' | 'purpleDream') => void = () => {};
    let currentPrimary = '';

    const { rerender } = render(
      <ThemeProvider>
        <ControllerProbe onReady={(c) => { change = c; }} />
        <ReadPrimary onPrimary={(c) => { currentPrimary = c; }} />
      </ThemeProvider>
    );

    // Initial theme is 'ocean' (#2563EB)
    expect(currentPrimary).toBe('#2563EB');

    // Trigger theme change
    change('purpleDream');

    // Allow state effect to flush
    await Promise.resolve();

    // Re-read current primary via probe
    rerender(
      <ThemeProvider>
        <ControllerProbe onReady={(c) => { change = c; }} />
        <ReadPrimary onPrimary={(c) => { currentPrimary = c; }} />
      </ThemeProvider>
    );

    // After switching, primary should be Purple Dream primary (#7C3AED)
    expect(currentPrimary).toBe('#7C3AED');
  });
});
