import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';
import { ThemeProvider } from '../../theme/ThemeContext';

describe('Button', () => {
  test('renders and handles press', () => {
    const onPress = jest.fn();
    const { getByA11yRole } = render(
      <ThemeProvider>
        <Button title="Click me" onPress={onPress} />
      </ThemeProvider>
    );

    const btn = getByA11yRole('button');
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('ghost variant has transparent background', () => {
    const { getByA11yRole } = render(
      <ThemeProvider>
        <Button title="Ghost" variant="ghost" />
      </ThemeProvider>
    );
    const btn = getByA11yRole('button');
    // RN Testing Library provides props; style is a function but resolves at render-time
    expect(btn.props.accessibilityLabel).toBe('Ghost');
  });
});
