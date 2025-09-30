import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Typography from '../components/Typography';
import TTTGrid from '../components/TTTGrid';
import PrimaryButton from '../components/PrimaryButton';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/colors';
import { getGameStatus, createEmptyBoard } from '../game/utils';
import { aiEasy, aiNormal } from '../game/ai';
import { Player } from '../game/types';
import { useSettings } from '../state/SettingsContext';
import { useStats } from '../state/StatsContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Result = 'X_WON' | 'O_WON' | 'DRAW';

const GameScreen: React.FC = () => {
  const { settings } = useSettings();
  const { recordWin, recordDraw } = useStats();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [board, setBoard] = useState<(Player | null)[]>(createEmptyBoard());
  const [turn, setTurn] = useState<Player>('X');
  const [locked, setLocked] = useState<boolean>(false);

  const status = useMemo(() => getGameStatus(board), [board]);
  const isOver = status !== 'IN_PROGRESS';

  const currentModeLabel = settings.mode === 'AI' ? `vs AI (${settings.aiDifficulty})` : 'PvP';
  const playerTurnLabel = `Turn: ${turn}`;

  const nextFirstPlayer = useCallback((current: Player): Player => {
    if (settings.firstPlayer === 'AUTO') {
      return current === 'X' ? 'O' : 'X';
    }
    return settings.firstPlayer;
  }, [settings.firstPlayer]);

  const reset = useCallback((first: Player) => {
    setBoard(createEmptyBoard());
    setTurn(first);
    setLocked(false);
  }, []);

  const openGameOver = useCallback((res: Result) => {
    navigation.navigate('GameOverModal', {
      result: res,
      onPlayAgain: () => reset(nextFirstPlayer(turn)),
      onHome: () => undefined,
    });
  }, [navigation, reset, nextFirstPlayer, turn]);

  // AI move when it's AI mode and it's O's or X's turn depending on who is human.
  useEffect(() => {
    if (settings.mode !== 'AI') return;
    if (isOver) return;

    // Human is X by default for MVP; could extend to choose later.
    const aiPlayer: Player = 'O';
    if (turn !== aiPlayer) return;

    setLocked(true);
    const timeout = setTimeout(() => {
      const pick =
        settings.aiDifficulty === 'EASY'
          ? aiEasy(board)
          : aiNormal(board, aiPlayer, 'X');
      if (pick != null) {
        setBoard((prev) => {
          const next = prev.slice();
          next[pick] = aiPlayer;
          return next;
        });
        setTurn('X');
      }
      setLocked(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [turn, settings.mode, settings.aiDifficulty, board, isOver]);

  // Check for end of game
  useEffect(() => {
    if (!isOver) return;
    if (status === 'DRAW') {
      recordDraw();
      openGameOver('DRAW');
    } else if (status === 'X_WON') {
      recordWin('X');
      openGameOver('X_WON');
    } else if (status === 'O_WON') {
      recordWin('O');
      openGameOver('O_WON');
    }
  }, [isOver, status, recordWin, recordDraw, openGameOver]);

  const onCellPress = useCallback((idx: number) => {
    if (locked || isOver) return;
    if (board[idx] != null) return;

    setBoard((prev) => {
      const next = prev.slice();
      next[idx] = turn;
      return next;
    });
    setTurn((prev) => (prev === 'X' ? 'O' : 'X'));
  }, [locked, isOver, board, turn]);

  const onRestart = useCallback(() => {
    reset(nextFirstPlayer(turn));
  }, [reset, nextFirstPlayer, turn]);

  return (
    <ScreenContainer>
      <View style={styles.top}>
        <Typography variant="title" style={{ marginBottom: spacing.sm }}>Tic Tac Toe</Typography>
        <Typography variant="caption" style={{ marginBottom: spacing.lg, color: colors.mutedText }}>
          {currentModeLabel}
        </Typography>
        <Typography variant="subtitle" style={{ marginBottom: spacing.lg }}>
          {isOver ? (status === 'DRAW' ? 'Game Over: Draw' : status === 'X_WON' ? 'Game Over: X' : 'Game Over: O') : playerTurnLabel}
        </Typography>
      </View>

      <TTTGrid board={board} onCellPress={onCellPress} disabled={locked || isOver} />

      <View style={{ height: spacing['2xl'] }} />

      <PrimaryButton label="Restart" variant="secondary" onPress={onRestart} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
  },
});

export default GameScreen;
