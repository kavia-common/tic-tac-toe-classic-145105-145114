import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GameScreen from '../GameScreen';
import { ThemeProvider } from '../../theme/ThemeContext';
import * as ScoreHook from '../../hooks/useScore';
import * as SettingsHook from '../../hooks/useSettings';
import * as GameHook from '../../hooks/useGame';

type Nav = { navigate: (r: 'Home' | 'Game' | 'Settings') => void; goBack: () => void };
const nav: Nav = { navigate: jest.fn(), goBack: jest.fn() };

describe('GameScreen', () => {
  beforeEach(() => {
    jest.spyOn(ScoreHook, 'useScore').mockReturnValue({
      score: { x: 1, o: 2, draws: 0 },
      addWin: jest.fn(),
      addDraw: jest.fn(),
      resetScore: jest.fn(),
      ready: true,
    } as unknown as ReturnType<typeof ScoreHook.useScore>);

    jest.spyOn(SettingsHook, 'useSettings').mockReturnValue({
      settings: { vsAI: false, aiLevel: 'easy', playerStarts: true, theme: 'ocean' },
      setSettings: jest.fn(),
      ready: true,
    } as unknown as ReturnType<typeof SettingsHook.useSettings>);

    jest.spyOn(GameHook, 'useGame').mockReturnValue({
      board: [null, null, null, null, null, null, null, null, null],
      turn: 'X',
      end: { status: 'ongoing', winner: null, line: null },
      move: jest.fn(),
      reset: jest.fn(),
    } as unknown as ReturnType<typeof GameHook.useGame>);
  });

  afterEach(() => jest.clearAllMocks());

  test('renders header and buttons, and triggers navigation', () => {
    const { getByText } = render(
      <ThemeProvider>
        <GameScreen navigation={nav} />
      </ThemeProvider>
    );

    fireEvent.press(getByText('Settings'));
    expect(nav.navigate).toHaveBeenCalledWith('Settings');

    fireEvent.press(getByText('Home'));
    expect(nav.navigate).toHaveBeenCalledWith('Home');

    fireEvent.press(getByText('Restart'));
    const game = GameHook.useGame();
    expect(game.reset).toHaveBeenCalled();
  });
});
