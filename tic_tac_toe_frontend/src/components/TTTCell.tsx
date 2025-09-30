import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Typography from './Typography';
import { colors } from '../theme/colors';
import { radii } from '../theme/shadows';

type Props = {
  value: 'X' | 'O' | null;
  onPress?: () => void;
  disabled?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * TTTCell
 * Single Tic Tac Toe grid cell.
 */
const TTTCell: React.FC<Props> = ({ value, onPress, disabled }) => {
  const color = value === 'X' ? colors.primary : value === 'O' ? colors.secondary : colors.text;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !!value}
      style={({ pressed }) => [
        styles.cell,
        { opacity: pressed ? 0.85 : 1, backgroundColor: '#fff' },
      ]}
    >
      <View>{value ? <Typography style={{ color, fontSize: 36, fontWeight: '700' }}>{value}</Typography> : null}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    minHeight: 84,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TTTCell;
