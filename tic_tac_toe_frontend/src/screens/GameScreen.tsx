import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { AppButton, Card, GradientHeader } from '../components/UI';
import { theme, typography } from '../theme';
import { Board, Cell, Winner, checkWinner, emptyBoard, getBestMove } from '../utils/game';
import type { GameScreenProps } from '../types/navigation';

type Score = { X: number; O: number; draws: number };

export default function GameScreen({ route, navigation }: GameScreenProps) {
  const mode = route.params?.mode ?? 'AI';
  const [board, setBoard] = useState<Board>(emptyBoard());
  const [turn, setTurn] = useState<Cell>('X');
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draws: 0 });
  const [gameOver, setGameOver] = useState<Winner>(null);
  const [aiSymbol, setAiSymbol] = useState<Cell>(mode === 'AI' ? 'O' : null);

  const winner = useMemo(() => checkWinner(board), [board]);

  useEffect(() => {
    if (winner) {
      setGameOver(winner);
      setScore((s) => {
        if (winner === 'X') return { ...s, X: s.X + 1 };
        if (winner === 'O') return { ...s, O: s.O + 1 };
        if (winner === 'DRAW') return { ...s, draws: s.draws + 1 };
        return s;
      });
    }
  }, [winner]);

  const isCellDisabled = (idx: number) => !!board[idx] || !!winner;

  const handleCellPress = (idx: number) => {
    if (isCellDisabled(idx)) return;
    setBoard((b) => {
      const next = b.slice();
      next[idx] = turn;
      return next;
    });
    setTurn((t) => (t === 'X' ? 'O' : 'X'));
  };

  // AI move
  useEffect(() => {
    if (mode !== 'AI' || winner || !aiSymbol) return;
    const isAiTurn = turn === aiSymbol;
    if (!isAiTurn) return;
    const t = setTimeout(() => {
      const move = getBestMove(board, aiSymbol, turn);
      if (move !== undefined && move !== null) {
        handleCellPress(move);
      }
    }, 320); // slight delay for smoothness
    return () => clearTimeout(t);
  }, [turn, aiSymbol, board, mode, winner]);

  const resetBoard = useCallback((nextFirst: Cell = 'X') => {
    setBoard(emptyBoard());
    setTurn(nextFirst);
    setGameOver(null);
  }, []);

  const onNewRound = () => {
    const nextFirst = (Math.random() > 0.5 ? 'X' : 'O') as Cell;
    resetBoard(nextFirst);
  };

  const onRestartMatch = () => {
    setScore({ X: 0, O: 0, draws: 0 });
    resetBoard('X');
  };

  const cell = (value: Cell, idx: number) => {
    const isX = value === 'X';
    const isO = value === 'O';
    const color = isX ? theme.colors.primary : isO ? theme.colors.secondary : theme.colors.text;
    return (
      <Pressable
        key={idx}
        onPress={() => handleCellPress(idx)}
        disabled={isCellDisabled(idx)}
        style={({ pressed }) => [
          styles.cell,
          pressed && { transform: [{ scale: 0.98 }] },
          (idx + Math.floor(idx / 3)) % 2 === 0 && { backgroundColor: '#ffffff' },
        ]}
      >
        <Text style={[styles.cellText, { color }]}>{value ?? ''}</Text>
      </Pressable>
    );
  };

  const gameStatus = winner
    ? winner === 'DRAW'
      ? 'It’s a draw'
      : `${winner} wins`
    : `Turn: ${turn}`;

  return (
    <View style={styles.container}>
      <GradientHeader
        title="Game"
        subtitle="Scoreboard and grid"
        right={
          <AppButton variant="ghost" onPress={() => navigation.navigate('Settings')}>
            Settings
          </AppButton>
        }
      />
      <View style={styles.content}>
        <Card>
          <View style={styles.scoreRow}>
            <View style={[styles.badge, { backgroundColor: '#e8f0ff', borderColor: theme.colors.primary }]}>
              <Text style={[styles.badgeTitle, { color: theme.colors.primary }]}>X</Text>
              <Text style={styles.badgeValue}>{score.X}</Text>
            </View>
            <View style={styles.centerStatus}>
              <Text style={styles.statusText}>{gameStatus}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: '#fff7ed', borderColor: theme.colors.secondary }]}>
              <Text style={[styles.badgeTitle, { color: theme.colors.secondary }]}>O</Text>
              <Text style={styles.badgeValue}>{score.O}</Text>
            </View>
          </View>
          <View style={styles.gridWrapper}>
            <View style={styles.grid}>
              {board.map((c, i) => cell(c, i))}
            </View>
          </View>
          <View style={styles.controls}>
            <AppButton variant="secondary" onPress={onNewRound} style={{ flex: 1 }}>
              New Round
            </AppButton>
            <AppButton variant="ghost" onPress={onRestartMatch} style={{ flex: 1 }}>
              Restart
            </AppButton>
            <AppButton variant="primary" onPress={() => navigation.goBack()} style={{ flex: 1 }}>
              Home
            </AppButton>
          </View>
          {mode === 'AI' ? (
            <View style={styles.modeNote}>
              <Text style={styles.note}>AI plays as {aiSymbol}. You are {aiSymbol === 'X' ? 'O' : 'X'}.</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <AppButton variant={aiSymbol === 'X' ? 'secondary' : 'ghost'} onPress={() => setAiSymbol('X')}>AI X</AppButton>
                <AppButton variant={aiSymbol === 'O' ? 'secondary' : 'ghost'} onPress={() => setAiSymbol('O')}>AI O</AppButton>
              </View>
            </View>
          ) : (
            <View style={styles.modeNote}>
              <Text style={styles.note}>2 Player mode: take turns on this device.</Text>
            </View>
          )}
        </Card>
      </View>

      <Modal visible={!!gameOver} transparent animationType="fade" onRequestClose={() => setGameOver(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {gameOver === 'DRAW' ? 'Draw!' : `${gameOver} Wins!`}
            </Text>
            <Text style={styles.modalSubtitle}>Start a new round or go home.</Text>
            <View style={styles.modalActions}>
              <AppButton variant="primary" onPress={onNewRound} style={{ flex: 1 }}>
                New Round
              </AppButton>
              <AppButton variant="ghost" onPress={() => setGameOver(null)} style={{ flex: 1 }}>
                Close
              </AppButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const CELL_SIZE = 84;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, padding: theme.layout.spacing },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
  badge: {
    minWidth: 84,
    padding: 10,
    borderRadius: theme.layout.radius,
    borderWidth: 1,
    alignItems: 'center',
    ...theme.shadow.soft,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  badgeValue: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
  },
  centerStatus: { flex: 1, alignItems: 'center' },
  statusText: {
    ...typography.subtitle,
    color: theme.colors.text,
    fontWeight: '600',
  },
  gridWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.layout.spacingLg,
    marginBottom: theme.layout.spacing,
  },
  grid: {
    width: CELL_SIZE * 3 + theme.layout.gridGap * 2,
    height: CELL_SIZE * 3 + theme.layout.gridGap * 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.layout.gridGap,
    backgroundColor: '#f3f4f6',
    padding: theme.layout.gridGap,
    borderRadius: theme.layout.radiusLg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
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
  controls: {
    marginTop: theme.layout.spacing,
    flexDirection: 'row',
    gap: 10,
  },
  modeNote: {
    marginTop: theme.layout.spacing,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  note: { color: theme.colors.muted },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.layout.spacing,
  },
  modalCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.radiusLg,
    padding: theme.layout.spacingLg,
    width: '100%',
    ...theme.shadow.card,
  },
  modalTitle: {
    ...typography.title,
    textAlign: 'center',
    color: theme.colors.text,
  },
  modalSubtitle: {
    ...typography.subtitle,
    textAlign: 'center',
    marginTop: 6,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: theme.layout.spacingLg,
  },
});
