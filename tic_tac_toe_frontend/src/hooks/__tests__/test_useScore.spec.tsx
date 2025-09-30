import { renderHook, act } from '@testing-library/react-native';
import { useScore } from '../useScore';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('useScore', () => {
  beforeEach(async () => {
    await (AsyncStorage as unknown as { clear: () => Promise<void> }).clear();
    jest.clearAllMocks();
  });

  test('initializes from storage and updates persist', async () => {
    const { result } = renderHook(() => useScore());

    await act(async () => {});
    expect(result.current.ready).toBe(true);
    expect(result.current.score).toEqual({ x: 0, o: 0, draws: 0 });

    act(() => result.current.addWin('X'));
    expect(result.current.score.x).toBe(1);
    expect((AsyncStorage as unknown as { setItem: jest.Mock }).setItem).toHaveBeenCalled();

    act(() => result.current.addDraw());
    expect(result.current.score.draws).toBe(1);

    act(() => result.current.resetScore());
    expect(result.current.score).toEqual({ x: 0, o: 0, draws: 0 });
  });
});
