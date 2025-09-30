import React, { memo, useMemo } from 'react';
import { Pressable, Text, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

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
  /** Themed button supporting primary, secondary, and ghost variants. */
  const t = useTheme();
  const base = useMemo(() => [styles.base, t.shadow.sm, { borderRadius: t.radius.lg }], [t.radius.lg, t.shadow.sm]);

  const variantStyle: ViewStyle = useMemo(() => {
    if (variant === 'primary') return { backgroundColor: t.colors.primary };
    if (variant === 'secondary') return { backgroundColor: t.colors.secondary };
    return { backgroundColor: 'transparent', borderWidth: 1, borderColor: t.colors.border };
  }, [t.colors.border, t.colors.primary, t.colors.secondary, variant]);

  const textColor = useMemo(() => (variant === 'ghost' ? t.colors.text : '#ffffff'), [t.colors.text, variant]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      hitSlop={8}
      style={({ pressed }) => [
        ...base,
        variantStyle,
        pressed ? { opacity: 0.9, transform: [{ scale: 0.98 }] } : null,
        disabled ? { opacity: 0.6 } : null,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
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
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default Button;
