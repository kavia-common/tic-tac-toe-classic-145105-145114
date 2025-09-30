import React, { memo, useMemo } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
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
  /** One Tic Tac Toe cell with press interaction and highlight on winning line. */
  const t = useTheme();

  const a11yLabel = useMemo(
    () => `Cell ${index + 1} ${value ? value : 'empty'}`,
    [index, value]
  );

  const valueColor = useMemo(
    () =>
      value === 'X'
        ? t.colors.primary
        : value === 'O'
        ? t.colors.secondary
        : t.colors.mutedText,
    [t.colors.mutedText, t.colors.primary, t.colors.secondary, value]
  );

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        t.shadow.sm,
        {
          backgroundColor: '#ffffff',
          borderRadius: t.radius.md,
          borderColor: highlight ? t.colors.secondary : '#e5e7eb',
          borderWidth: highlight ? 2 : 1,
        },
        pressed ? { transform: [{ scale: 0.98 }] } : null,
        style,
      ]}
    >
      <Text style={[styles.text, { color: valueColor }]}>{value || ''}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  text: {
    fontSize: 48,
    fontWeight: '800',
  },
});

export default Cell;
