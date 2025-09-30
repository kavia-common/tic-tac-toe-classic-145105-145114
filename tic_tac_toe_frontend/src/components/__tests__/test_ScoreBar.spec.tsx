import React from 'react';
import { render } from '@testing-library/react-native';
import ScoreBar from '../ScoreBar';
import { ThemeProvider } from '../../theme/ThemeContext';

describe('ScoreBar', () => {
  test('shows scores for X, O, and Draws', () => {
    const { getByText } = render(
      <ThemeProvider>
        <ScoreBar x={2} o={3} draws={1} />
      </ThemeProvider>
    );
    getByText('X');
    getByText('2');
    getByText('O');
    getByText('3');
    getByText('Draws');
    getByText('1');
  });
});
