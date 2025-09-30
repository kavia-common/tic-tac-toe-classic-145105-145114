import React from 'react';
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
const Button: React.FC<Props> = ({ title, onPress, variant = 'primary', style, disabled, accessibilityLabel }) => {
  /** Themed button supporting primary, secondary, and ghost variants. */
  const t = useTheme();
  const base = [styles.base, t.shadow.sm, { borderRadius: t.radius.lg }];
  let variantStyle: ViewStyle = {};
  if (variant === 'primary') {
    variantStyle = { backgroundColor: t.colors.primary };
  } else if (variant === 'secondary') {
    variantStyle = { backgroundColor: t.colors.secondary };
  } else {
    variantStyle = { backgroundColor: 'transparent', borderWidth: 1, borderColor: t.colors.border };
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      style={({ pressed }) => [
        ...base,
        variantStyle,
        pressed ? { opacity: 0.9, transform: [{ scale: 0.98 }] } : null,
        disabled ? { opacity: 0.6 } : null,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
    >
      <Text style={[styles.text, { color: variant === 'ghost' ? t.colors.text : '#ffffff' }]}>{title}</Text>
    </Pressable>
  );
};

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
