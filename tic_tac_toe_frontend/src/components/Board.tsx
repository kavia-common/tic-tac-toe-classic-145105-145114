import React from 'react';
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

// PUBLIC_INTERFACE
const Board: React.FC<Props> = ({ board, onCellPress, winningLine, disabled }) => {
  /** 3x3 game board with winning line highlight and press handling. */
  const t = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: t.colors.surface, borderRadius: t.radius.lg }, t.shadow.md]}>
      <View style={styles.grid}>
        {board.map((v, i) => (
          <Cell
            key={i}
            index={i}
            value={v}
            onPress={() => onCellPress(i)}
            highlight={!!winningLine?.includes(i)}
            disabled={disabled}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Board;
