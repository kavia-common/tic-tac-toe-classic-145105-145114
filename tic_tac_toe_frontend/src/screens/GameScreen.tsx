import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import ScoreBar from '../components/ScoreBar';
import Board from '../components/Board';
import Button from '../components/Button';
import ModalCard from '../components/ModalCard';
import { useScore } from '../hooks/useScore';
import { useSettings } from '../hooks/useSettings';
import { useGame } from '../hooks/useGame';

type RouteName = 'Home' | 'Game' | 'Settings';
type NavLike = { navigate: (route: RouteName) => void; goBack?: () => void };

// PUBLIC_INTERFACE
const GameScreen: React.FC<{ navigation: NavLike }> = ({ navigation }) => {
  /** Play screen with board, score bar, controls and game-over dialog. */
  const t = useTheme();
  const { score, ready: scoreReady, resetScore } = useScore();
  const { settings, ready: settingsReady } = useSettings();
  const { board, turn, end, move, reset } = useGame();
  const [showOver, setShowOver] = useState(false);

  const statusText = useMemo(() => {
    if (end.status === 'win') {
      return `${end.winner} wins!`;
    } else if (end.status === 'draw') {
      return `It's a draw`;
    }
    return `${turn}'s turn ${settings.vsAI ? '(vs AI)' : '(2P)'}`;
  }, [end, turn, settings.vsAI]);

  React.useEffect(() => {
    if (end.status !== 'ongoing') setShowOver(true);
  }, [end.status]);

  if (!scoreReady || !settingsReady) {
    return (
      <View style={[styles.container, { backgroundColor: t.colors.background, alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ color: t.colors.mutedText }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: t.colors.background }]}>
      <LinearGradient colors={t.gradients.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, t.shadow.md]}>
        <Text style={[styles.title, { color: t.colors.text }]}>Play</Text>
        <ScoreBar x={score.x} o={score.o} draws={score.draws} />
      </LinearGradient>

      <View style={styles.status}>
        <Text style={[styles.statusText, { color: t.colors.mutedText }]}>{statusText}</Text>
      </View>

      <View style={styles.boardWrap}>
        <Board
          board={board}
          onCellPress={idx => move(idx)}
          disabled={end.status !== 'ongoing' || (settings.vsAI && ((settings.playerStarts && turn === 'O') || (!settings.playerStarts && turn === 'X')))}
          winningLine={end.line}
        />
      </View>

      <View style={styles.controls}>
        <Button title="Restart" variant="ghost" onPress={() => reset()} />
        <Button title="Settings" variant="secondary" onPress={() => navigation.navigate('Settings')} />
        <Button title="Home" variant="primary" onPress={() => navigation.navigate('Home')} />
      </View>

      <ModalCard
        visible={showOver}
        title={end.status === 'win' ? 'Game Over' : "It's a Draw"}
        message={end.status === 'win' ? `${end.winner} takes the round.` : 'Well played!'}
        onClose={() => setShowOver(false)}
        confirmText="Play Again"
        onConfirm={() => {
          setShowOver(false);
          reset();
        }}
      />

      <View style={styles.footer}>
        <Button title="Reset Score" variant="ghost" onPress={resetScore} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { borderRadius: 20, padding: 16, marginTop: 8 },
  title: { fontSize: 22, fontWeight: '900', marginBottom: 8 },
  status: { marginTop: 16, alignItems: 'center' },
  statusText: { fontSize: 14, fontWeight: '700' },
  boardWrap: { marginTop: 16 },
  controls: { marginTop: 16, flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  footer: { marginTop: 16, alignItems: 'center' },
});

export default GameScreen;
