import { renderHook, act } from '@testing-library/react-native';
import { useGame } from '../useGame';
import * as UseSettings from '../useSettings';
import * as UseScore from '../useScore';

jest.useFakeTimers();

type MockUseScore = {
  score: { x: number; o: number; draws: number };
  addWin: (w: 'X' | 'O') => void;
  addDraw: () => void;
  resetScore: () => void;
  ready: boolean;
};

type MockUseSettings = {
  settings: { vsAI: boolean; aiLevel: 'easy' | 'medium' | 'hard'; playerStarts: boolean; theme: 'ocean' | 'royalDark' | 'purpleDream' };
  setSettings: (p: Partial<MockUseSettings['settings']>) => void;
  ready: boolean;
};

describe('useGame', () => {
  beforeEach(() => {
    jest.spyOn(UseScore, 'useScore').mockReturnValue({
      score: { x: 0, o: 0, draws: 0 },
      addWin: jest.fn(),
      addDraw: jest.fn(),
      resetScore: jest.fn(),
      ready: true,
    } as unknown as MockUseScore);

    // Player starts as X, vs AI with easy level
    jest.spyOn(UseSettings, 'useSettings').mockReturnValue({
      settings: { vsAI: true, aiLevel: 'easy', playerStarts: true, theme: 'ocean' },
      setSettings: jest.fn(),
      ready: true,
    } as unknown as MockUseSettings);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('2P flow ends with a win', () => {
    // Re-mock settings: no AI
    (UseSettings.useSettings as unknown as jest.Mock).mockReturnValueOnce({
      settings: { vsAI: false, aiLevel: 'easy', playerStarts: true, theme: 'ocean' },
      setSettings: jest.fn(),
      ready: true,
    } as MockUseSettings);

    const { result } = renderHook(() => useGame());

    act(() => {
      // X 0, O 3, X 1, O 4, X 2 => X wins top row
      result.current.move(0);
      result.current.move(3);
      result.current.move(1);
      result.current.move(4);
      result.current.move(2);
    });

    expect(result.current.end.status).toBe('win');
    expect(result.current.end.winner).toBe('X');
    expect(result.current.end.line).toEqual([0,1,2]);
  });

  test('AI makes a move after delay when applicable', () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.move(0); // X plays first
    });

    // Advance timers to trigger AI
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Board should have 2 filled cells now (X + AI)
    const filled = result.current.board.filter((c) => c !== null).length;
    expect(filled).toBeGreaterThanOrEqual(2);
  });
});
