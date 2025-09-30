import React from 'react';
import { View, StyleSheet } from 'react-native';
import TTTCell from './TTTCell';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { radii, shadows } from '../theme/shadows';

type Props = {
  board: Array<'X' | 'O' | null>;
  onCellPress: (index: number) => void;
  disabled?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * TTTGrid
 * 3x3 grid for Tic Tac Toe with Ocean Professional styling.
 */
const TTTGrid: React.FC<Props> = ({ board, onCellPress, disabled }) => {
  return (
    <View style={styles.card}>
      <View style={styles.grid}>
        {board.map((val, idx) => (
          <View key={idx} style={styles.cellWrap}>
            <TTTCell value={val} onPress={() => onCellPress(idx)} disabled={disabled} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
    ...shadows.soft,
  },
  grid: {
    aspectRatio: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cellWrap: {
    width: '33.3333%',
    padding: spacing.sm,
  },
});

export default TTTGrid;
