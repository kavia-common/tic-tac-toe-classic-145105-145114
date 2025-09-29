import React, { PropsWithChildren } from 'react';
import { Pressable, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, gradient, typography } from '../theme';

type ButtonProps = PropsWithChildren<{
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
  disabled?: boolean;
}>;

// PUBLIC_INTERFACE
export function AppButton({ onPress, children, variant = 'primary', style, disabled }: ButtonProps) {
  /** Themed button with variants: primary, secondary, ghost */
  const colors = theme.colors;
  const baseStyle = [
    styles.buttonBase,
    variant === 'primary' && { backgroundColor: colors.primary },
    variant === 'secondary' && { backgroundColor: colors.secondary },
    variant === 'ghost' && { backgroundColor: 'transparent', borderColor: colors.border, borderWidth: 1 },
    disabled && { opacity: 0.6 },
    style,
  ];
  const textStyle = [
    styles.buttonText,
    variant === 'ghost' && { color: colors.text },
  ];
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [baseStyle, pressed && { transform: [{ scale: 0.98 }] }]}>
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}

type CardProps = PropsWithChildren<{ style?: ViewStyle }>;

// PUBLIC_INTERFACE
export function Card({ children, style }: CardProps) {
  /** Elevated surface container with soft shadow and rounded corners */
  return <View style={[styles.card, style]}>{children}</View>;
}

type HeaderProps = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

// PUBLIC_INTERFACE
export function GradientHeader({ title, subtitle, right }: HeaderProps) {
  /** Subtle gradient header with title and optional right content */
  return (
    <LinearGradient
      colors={[gradient.from, gradient.to]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.headerTitle]}>{title}</Text>
        {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: theme.layout.radius,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.soft,
  },
  buttonText: {
    ...typography.button,
    color: '#ffffff',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.radiusLg,
    padding: theme.layout.spacing,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  header: {
    height: theme.layout.headerHeight,
    borderBottomLeftRadius: theme.layout.radiusLg,
    borderBottomRightRadius: theme.layout.radiusLg,
    paddingHorizontal: theme.layout.spacing,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    ...typography.title,
    color: theme.colors.text,
  },
  headerSubtitle: {
    ...typography.subtitle,
  },
});
