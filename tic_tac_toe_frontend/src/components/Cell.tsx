import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, ViewStyle, Animated, Easing } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { CellValue } from '../utils/game';

type Props = {
  value: CellValue;
  onPress?: () => void;
  highlight?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  index: number;
};

// PUBLIC_INTERFACE
const Cell: React.FC<Props> = memo(function Cell({ value, onPress, highlight, disabled, style, index }) {
  /** One Tic Tac Toe cell with animated press, value pop-in, and highlight pulse on winning line. */
  const t = useTheme();

  // Accessibility label for screen readers
  const a11yLabel = useMemo(
    () => `Cell ${index + 1} ${value ? value : 'empty'}`,
    [index, value]
  );

  // Determine text color by value (X blue, O amber)
  const valueColor = useMemo(
    () =>
      value === 'X'
        ? t.colors.primary
        : value === 'O'
        ? t.colors.secondary
        : t.colors.mutedText,
    [t.colors.mutedText, t.colors.primary, t.colors.secondary, value]
  );

  // Animated value for subtle scale when a value appears
  const appear = useRef(new Animated.Value(0)).current;
  // Animated value for pulsing border when a cell is in the winning line
  const pulse = useRef(new Animated.Value(0)).current;

  // Trigger pop-in when the value changes from empty to X/O
  useEffect(() => {
    if (value) {
      appear.setValue(0);
      Animated.timing(appear, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    } else {
      appear.setValue(0);
    }
  }, [appear, value]);

  // Pulse the border if highlighted
  useEffect(() => {
    if (highlight) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1, duration: 380, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
          Animated.timing(pulse, { toValue: 0, duration: 380, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
        ])
      );
      loop.start();
      return () => loop.stop();
    } else {
      pulse.stopAnimation();
      pulse.setValue(0);
    }
  }, [highlight, pulse]);

  const borderColor = highlight
    ? pulse.interpolate({
        inputRange: [0, 1],
        outputRange: [t.colors.secondary, '#fbbf24'], // amber 400 flash
      })
    : '#e5e7eb';

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ disabled }}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        t.shadow.sm,
        {
          backgroundColor: '#ffffff',
          borderRadius: t.radius.md,
          // Animated color is acceptable in RN; keep typing strict by casting to string | Animated.AnimatedInterpolation<string>
          borderColor: (borderColor as unknown) as string,
          borderWidth: highlight ? 2 : 1,
        },
        // pressed feedback, reduced motion friendly (scale only)
        pressed ? { transform: [{ scale: 0.98 }] } : null,
        style,
      ]}
    >
      <Animated.Text
        style={[
          styles.text,
          {
            color: valueColor,
            opacity: value ? 1 : 0.5,
            transform: [
              {
                scale: appear.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                }),
              },
            ],
          },
        ]}
      >
        {value || ''}
      </Animated.Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    width: '33.3333%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  text: {
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

export default Cell;
