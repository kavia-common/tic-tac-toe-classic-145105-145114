import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';
import { Cell } from '../utils/game';
import { cellA11yLabel } from '../utils/ui';

type Props = {
  index: number;
  value: Cell;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

// PUBLIC_INTERFACE
export default function GridCell({ index, value, onPress, disabled, style }: Props) {
  /** Themed grid cell with accessibility labels and subtle press feedback */
  const isX = value === 'X';
  const isO = value === 'O';
  const color = isX ? theme.colors.primary : isO ? theme.colors.secondary : theme.colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={cellA11yLabel(index, value)}
      style={({ pressed }) => [
        styles.cell,
        pressed && { transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      <Text
        accessibilityElementsHidden
        importantForAccessibility="no"
        style={[styles.cellText, { color }]}
      >
        {value ?? ''}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 84,
    height: 84,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.card,
  },
  cellText: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
