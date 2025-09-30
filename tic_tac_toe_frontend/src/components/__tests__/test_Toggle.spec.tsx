import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Toggle from '../Toggle';
import { ThemeProvider } from '../../theme/ThemeContext';

describe('Toggle', () => {
  test('toggles value on press', () => {
    const onChange = jest.fn();
    const { getByA11yRole } = render(
      <ThemeProvider>
        <Toggle value={false} onChange={onChange} />
      </ThemeProvider>
    );
    const sw = getByA11yRole('switch');
    fireEvent.press(sw);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
