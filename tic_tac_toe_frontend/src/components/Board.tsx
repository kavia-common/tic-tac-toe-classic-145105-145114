import React, { memo, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Cell from './Cell';
import { Board as BoardType } from '../utils/game';

type Props = {
  board: BoardType;
  onCellPress: (idx: number) => void;
  winningLine?: number[] | null;
  disabled?: boolean;
};

/**
 * Compute accessibility label for the board from a linear board state.
 * Example: "Row 1: X empty O; Row 2: ...".
 */
function useBoardA11yLabel(board: BoardType) {
  return useMemo(() => {
    const toWord = (v: string | null) => (v ? v : 'empty');
    const rows = [
      `Row 1: ${toWord(board[0])} ${toWord(board[1])} ${toWord(board[2])}`,
      `Row 2: ${toWord(board[3])} ${toWord(board[4])} ${toWord(board[5])}`,
      `Row 3: ${toWord(board[6])} ${toWord(board[7])} ${toWord(board[8])}`,
    ];
    return rows.join('; ');
  }, [board[0], board[1], board[2], board[3], board[4], board[5], board[6], board[7], board[8]]);
}

// PUBLIC_INTERFACE
const Board: React.FC<Props> = memo(function Board({ board, onCellPress, winningLine, disabled }) {
  /** 3x3 game board with responsive square layout, winning line highlight and press handling. */
  const t = useTheme();
  const a11yLabel = useBoardA11yLabel(board);

  const handlePress = useCallback(
    (idx: number) => () => onCellPress(idx),
    [onCellPress]
  );

  const gridStyle = useMemo(
    () => [
      styles.grid,
      {
        borderRadius: t.radius.lg,
        backgroundColor: t.colors.surface,
      },
      t.shadow.md,
    ],
    [t.colors.surface, t.radius.lg, t.shadow.md]
  );

  return (
    <View
      accessible
      accessibilityRole="grid"
      accessibilityLabel={`Tic Tac Toe board. ${a11yLabel}`}
      accessibilityHint="3 by 3 grid. Navigate cells to place your mark."
      style={styles.wrap}
    >
      <View style={gridStyle}>
        {board.map((v, i) => (
          <Cell
            key={i}
            index={i}
            value={v}
            onPress={handlePress(i)}
            highlight={!!winningLine?.includes(i)}
            disabled={disabled}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 6,
  },
  grid: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
});

export default Board;
