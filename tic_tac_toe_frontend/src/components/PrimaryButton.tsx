import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle, Text } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { radii, shadows } from '../theme/shadows';
import { typography } from '../theme/typography';

type Props = PressableProps & {
  label: string;
  style?: ViewStyle | ViewStyle[];
  variant?: 'primary' | 'secondary';
};

/**
 * PUBLIC_INTERFACE
 * PrimaryButton
 * Ocean Professional button with rounded corners and subtle shadow.
 */
const PrimaryButton: React.FC<Props> = ({ label, style, variant = 'primary', ...rest }) => {
  const backgroundColor = variant === 'primary' ? colors.primary : colors.secondary;
  const textColor = '#ffffff';
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        { backgroundColor, opacity: pressed ? 0.9 : 1 },
        style,
      ]}
      android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
      {...rest}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  label: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
  },
});

export default PrimaryButton;
