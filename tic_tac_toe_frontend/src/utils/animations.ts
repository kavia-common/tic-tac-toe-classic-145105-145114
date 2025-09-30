import { Animated, Easing, Platform } from 'react-native';

/**
 * Centralized animation helpers to keep micro-interactions consistent across the app.
 * All durations, easings, and drivers live here to ensure a cohesive feel.
 */

export const Animate = {
  /**
   * Creates a subtle scale press animation for buttons or pressables.
   * Returns an animated style and imperative handlers.
   */
  pressScale(initial = 1, pressed = 0.985, duration = 120) {
    const v = new Animated.Value(0);
    const style = {
      transform: [
        {
          scale: v.interpolate({
            inputRange: [0, 1],
            outputRange: [initial, pressed],
          }),
        },
      ],
    };
    const onPressIn = () =>
      Animated.timing(v, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();

    const onPressOut = () =>
      Animated.timing(v, {
        toValue: 0,
        duration: duration + 60,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();

    return { style, onPressIn, onPressOut };
  },

  /**
   * Fade in utility, often applied when screens mount or content loads.
   */
  fadeIn(duration = 220, delay = 0) {
    const v = new Animated.Value(0);
    const style = { opacity: v };
    const start = () =>
      Animated.timing(v, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    return { style, start, value: v };
  },

  /**
   * Pop/appear animation for content (e.g., cell value).
   */
  popIn(duration = 180) {
    const v = new Animated.Value(0);
    const style = {
      transform: [
        {
          scale: v.interpolate({
            inputRange: [0, 1],
            outputRange: [0.85, 1],
          }),
        },
      ],
      opacity: v.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
      }),
    };
    const start = () =>
      Animated.timing(v, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    return { style, start, value: v };
  },

  /**
   * Gentle pulse for highlight borders; uses non-native driver due to color/border metrics.
   */
  pulse(duration = 380) {
    const v = new Animated.Value(0);
    const start = () =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
          Animated.timing(v, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
        ])
      ).start();
    const stop = () => v.stopAnimation();
    return { value: v, start, stop };
  },

  /**
   * Minimal haptic feedback shim; avoids adding extra deps and keeps behavior subtle.
   */
  hapticLight() {
    // On modern platforms we could integrate Expo Haptics; for now a no-op to avoid new deps.
    // Future: conditionally import 'expo-haptics' and trigger selection/impactLight here.
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      // noop placeholder for consistent call sites
    }
  },
};
