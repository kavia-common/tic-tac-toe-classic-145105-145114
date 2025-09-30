import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Board from '../Board';
import { ThemeProvider } from '../../theme/ThemeContext';
import { emptyBoard } from '../../utils/game';

describe('Board', () => {
  test('renders 9 cells and handles onCellPress per index', () => {
    const onCellPress = jest.fn();
    const { getByA11yLabel } = render(
      <ThemeProvider>
        <Board board={emptyBoard()} onCellPress={onCellPress} />
      </ThemeProvider>
    );

    // press cell 3 (index 2)
    const cell3 = getByA11yLabel('Cell 3 empty');
    fireEvent.press(cell3);
    expect(onCellPress).toHaveBeenCalledWith(2);
  });
});
