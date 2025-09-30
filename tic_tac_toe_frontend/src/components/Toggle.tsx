import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  value: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
  disabled?: boolean;
};

// PUBLIC_INTERFACE
const Toggle: React.FC<Props> = memo(function Toggle({ value, onChange, disabled }) {
  /** Simple themed toggle control with animated thumb movement. */
  const t = useTheme();
  const translate = useMemo(() => new Animated.Value(value ? 20 : 0), []); // stable instance

  // keep animation in sync with value
  React.useEffect(() => {
    Animated.timing(translate, {
      toValue: value ? 20 : 0,
      duration: t.motion.normal,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [t.motion.normal, translate, value]);

  const onToggle = useCallback(() => {
    if (!disabled) onChange?.(!value);
  }, [disabled, onChange, value]);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ disabled, checked: value }}
      accessibilityLabel="Toggle"
      accessibilityHint={value ? 'Double tap to turn off' : 'Double tap to turn on'}
      onPress={onToggle}
      hitSlop={6}
      style={[
        styles.track,
        { backgroundColor: value ? t.colors.primary : '#e5e7eb', borderRadius: 9999 },
        disabled ? { opacity: 0.6 } : null,
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: '#ffffff',
            borderRadius: 9999,
            transform: [{ translateX: translate }],
            borderColor: value ? t.colors.primary : '#d1d5db',
          },
        ]}
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderWidth: 1,
  },
});

export default Toggle;
