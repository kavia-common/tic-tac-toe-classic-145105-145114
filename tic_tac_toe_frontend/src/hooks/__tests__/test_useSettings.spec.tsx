import { renderHook, act } from '@testing-library/react-native';
import { useSettings } from '../useSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('useSettings', () => {
  beforeEach(async () => {
    await (AsyncStorage as unknown as { clear: () => Promise<void> }).clear();
    jest.clearAllMocks();
  });

  test('loads default then persisted settings and allows updates', async () => {
    const { result } = renderHook(() => useSettings());

    await act(async () => {});

    expect(result.current.ready).toBe(true);
    expect(result.current.settings.theme).toBe('ocean');

    await act(async () => {
      await result.current.setSettings({ theme: 'purpleDream', vsAI: false });
    });

    expect(result.current.settings.theme).toBe('purpleDream');
    expect(result.current.settings.vsAI).toBe(false);
    expect((AsyncStorage as unknown as { setItem: jest.Mock }).setItem).toHaveBeenCalled();
  });
});
