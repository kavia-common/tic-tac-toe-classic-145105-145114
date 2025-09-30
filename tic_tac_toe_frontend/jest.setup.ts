import '@testing-library/jest-native/extend-expect';
import 'whatwg-fetch';
import React, { PropsWithChildren, ReactElement } from 'react';

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  return {
    LinearGradient: ({ children }: PropsWithChildren): ReactElement | null =>
      React.createElement('LinearGradient', null, children as ReactElement),
  };
});

// Mock react-native Animated to use timers in tests
jest.spyOn(global, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
  return setTimeout(() => cb(0), 0) as unknown as number;
});

// Mock AsyncStorage with memory storage
jest.mock('@react-native-async-storage/async-storage', () => {
  let store: Record<string, string> = {};
  return {
    __esModule: true,
    default: {
      setItem: jest.fn(async (k: string, v: string) => {
        store[k] = String(v);
      }),
      getItem: jest.fn(async (k: string) => store[k] ?? null),
      removeItem: jest.fn(async (k: string) => {
        delete store[k];
      }),
      clear: jest.fn(async () => {
        store = {};
      }),
    },
  };
});

// Silence React Native warning noise during tests
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Ensure fake timers are modern for tests that opt-in
// Individual tests will enable/disable as needed.
