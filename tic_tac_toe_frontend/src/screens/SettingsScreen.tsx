import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Typography from '../components/Typography';
import { ToggleRow } from '../components/Toggles';
import SegmentedControl from '../components/SegmentedControl';
import { useSettings } from '../state/SettingsContext';
import PrimaryButton from '../components/PrimaryButton';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/colors';
import { radii, shadows } from '../theme/shadows';

const SettingsScreen: React.FC = () => {
  const { settings, setSettings, resetDefaults } = useSettings();

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Typography variant="subtitle" style={{ marginBottom: spacing.md }}>First Player</Typography>
        <SegmentedControl
          value={settings.firstPlayer}
          onChange={(v) => setSettings({ firstPlayer: v as 'X' | 'O' | 'AUTO' })}
          options={[
            { label: 'Auto', value: 'AUTO' },
            { label: 'X', value: 'X' },
            { label: 'O', value: 'O' },
          ]}
        />
      </View>

      <View style={styles.card}>
        <Typography variant="subtitle" style={{ marginBottom: spacing.sm }}>Preferences</Typography>
        <ToggleRow label="Sound" value={settings.sound} onValueChange={(v) => setSettings({ sound: v })} />
        <ToggleRow label="Haptics" value={settings.haptics} onValueChange={(v) => setSettings({ haptics: v })} />
        <ToggleRow label="Animations" value={settings.animations} onValueChange={(v) => setSettings({ animations: v })} />
      </View>

      <View style={{ flex: 1 }} />

      <PrimaryButton label="Reset to Defaults" variant="secondary" onPress={resetDefaults} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
    marginBottom: spacing.xl,
  },
});

export default SettingsScreen;
