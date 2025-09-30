import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Typography from '../components/Typography';
import PrimaryButton from '../components/PrimaryButton';
import SegmentedControl from '../components/SegmentedControl';
import { useSettings } from '../state/SettingsContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { radii, shadows } from '../theme/shadows';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const HomeScreen: React.FC = () => {
  const { settings, setSettings } = useSettings();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer>
      <View style={styles.headerCard}>
        <Typography variant="title">Tic Tac Toe</Typography>
        <Typography variant="subtitle">Classic. Minimal. Ocean Professional.</Typography>
      </View>

      <View style={styles.card}>
        <Typography variant="subtitle" style={{ marginBottom: spacing.md }}>Game Mode</Typography>
        <SegmentedControl
          value={settings.mode}
          onChange={(v) => setSettings({ mode: v as 'PVP' | 'AI' })}
          options={[
            { label: 'Player vs AI', value: 'AI' },
            { label: 'Player vs Player', value: 'PVP' },
          ]}
        />
        {settings.mode === 'AI' && (
          <View style={{ marginTop: spacing.lg }}>
            <Typography variant="subtitle" style={{ marginBottom: spacing.md }}>AI Difficulty</Typography>
            <SegmentedControl
              value={settings.aiDifficulty}
              onChange={(v) => setSettings({ aiDifficulty: v as 'EASY' | 'NORMAL' })}
              options={[
                { label: 'Easy', value: 'EASY' },
                { label: 'Normal', value: 'NORMAL' },
              ]}
            />
          </View>
        )}
      </View>

      <View style={{ flex: 1 }} />

      <PrimaryButton
        label="Start Game"
        onPress={() => navigation.navigate('Game')}
        style={{ marginBottom: spacing.lg }}
      />
      <PrimaryButton
        label="Settings"
        variant="secondary"
        onPress={() => navigation.navigate('Settings')}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
  },
});

export default HomeScreen;
