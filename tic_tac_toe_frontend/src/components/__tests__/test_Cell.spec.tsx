import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Cell from '../Cell';
import { ThemeProvider } from '../../theme/ThemeContext';

describe('Cell', () => {
  test('renders accessibility label and handles press', () => {
    const onPress = jest.fn();
    const { getByA11yLabel } = render(
      <ThemeProvider>
        <Cell value={null} index={0} onPress={onPress} />
      </ThemeProvider>
    );
    const cell = getByA11yLabel('Cell 1 empty');
    fireEvent.press(cell);
    expect(onPress).toHaveBeenCalled();
  });

  test('shows X or O value', () => {
    const { getByText, rerender } = render(
      <ThemeProvider>
        <Cell value={'X'} index={1} />
      </ThemeProvider>
    );
    getByText('X');
    rerender(
      <ThemeProvider>
        <Cell value={'O'} index={1} />
      </ThemeProvider>
    );
    getByText('O');
  });
});
