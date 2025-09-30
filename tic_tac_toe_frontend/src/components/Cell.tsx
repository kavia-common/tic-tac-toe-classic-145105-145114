import React, { memo, useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, ViewStyle, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { CellValue } from '../utils/game';
import { Animate } from '../utils/animations';

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
  const a11yLabel = useMemo(() => `Cell ${index + 1} ${value ? value : 'empty'}`, [index, value]);

  // Determine text color by value (X blue, O amber)
  const valueColor = useMemo(
    () => (value === 'X' ? t.colors.primary : value === 'O' ? t.colors.secondary : t.colors.mutedText),
    [t.colors.mutedText, t.colors.primary, t.colors.secondary, value]
  );

  // Shared press animation for tactile feedback
  const pressAnim = React.useMemo(() => Animate.pressScale(1, 0.98, t.motion.fast), [t.motion.fast]);
  // Pop-in animation for value appearing
  const appear = React.useMemo(() => Animate.popIn(t.motion.fast), [t.motion.fast]);
  // Pulse animation for winning highlight
  const pulse = React.useMemo(() => Animate.pulse(t.motion.slow), [t.motion.slow]);

  // Trigger pop-in when value appears
  useEffect(() => {
    if (value) {
      appear.value.setValue(0);
      appear.start();
    } else {
      appear.value.setValue(0);
    }
  }, [appear, value]);

  // Manage pulse loop when highlighted
  useEffect(() => {
    if (highlight) {
      pulse.start();
      return () => pulse.stop();
    }
    pulse.stop();
    pulse.value.setValue(0);
  }, [highlight, pulse]);

  const borderColor =
    highlight
      ? (pulse.value.interpolate({
          inputRange: [0, 1],
          outputRange: [t.colors.secondary, '#fbbf24'],
        }) as unknown as string)
      : '#e5e7eb';

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityHint="Double tap to place your mark"
      accessibilityState={{ disabled }}
      onPressIn={pressAnim.onPressIn}
      onPressOut={pressAnim.onPressOut}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        t.shadow.sm,
        {
          backgroundColor: '#ffffff',
          borderRadius: t.radius.md,
          borderColor,
          borderWidth: highlight ? 2 : 1,
        },
        pressed ? { opacity: 0.98 } : null,
        style,
      ]}
    >
      <Animated.View style={appear.style}>
        <Animated.Text
          style={[
            styles.text,
            {
              color: valueColor,
              opacity: value ? 1 : 0.5,
            },
          ]}
        >
          {value || ''}
        </Animated.Text>
      </Animated.View>
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
