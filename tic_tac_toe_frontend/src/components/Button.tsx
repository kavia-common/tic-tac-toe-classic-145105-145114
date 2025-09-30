import React, { memo, useMemo } from 'react';
import { Pressable, Text, ViewStyle, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Animate } from '../utils/animations';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
  disabled?: boolean;
  accessibilityLabel?: string;
};

// PUBLIC_INTERFACE
const Button: React.FC<Props> = memo(function Button({
  title,
  onPress,
  variant = 'primary',
  style,
  disabled,
  accessibilityLabel,
}) {
  /** Themed button supporting primary, secondary, and ghost variants with shared press animation. */
  const t = useTheme();
  const press = useMemo(() => Animate.pressScale(1, 0.985, t.motion.fast), [t.motion.fast]);

  const base = useMemo(
    () => [styles.base, t.shadow.sm, { borderRadius: t.radius.lg }],
    [t.radius.lg, t.shadow.sm]
  );

  const variantStyle: ViewStyle = useMemo(() => {
    if (variant === 'primary') return { backgroundColor: t.colors.primary };
    if (variant === 'secondary') return { backgroundColor: t.colors.secondary };
    return { backgroundColor: 'transparent', borderWidth: 1, borderColor: t.colors.border };
  }, [t.colors.border, t.colors.primary, t.colors.secondary, variant]);

  const textColor = useMemo(() => (variant === 'ghost' ? t.colors.text : '#ffffff'), [t.colors.text, variant]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={`Activates ${title}`}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled }}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      hitSlop={8}
      style={({ pressed }) => [
        ...base,
        variantStyle,
        pressed ? { opacity: 0.95 } : null,
        disabled ? { opacity: 0.6 } : null,
        style,
      ]}
      onPress={
        disabled
          ? undefined
          : () => {
              // tactile feedback stub for future haptics
              // Animate.hapticLight();
              onPress?.();
            }
      }
    >
      <Animated.View style={press.style}>
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});

export default Button;
