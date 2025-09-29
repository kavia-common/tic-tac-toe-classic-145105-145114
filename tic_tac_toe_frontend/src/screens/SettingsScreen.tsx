import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { AppButton, Card, GradientHeader } from '../components/UI';
import { theme } from '../theme';

type Settings = {
  sound: boolean;
  firstPlayer: 'X' | 'O';
  aiSymbol: 'X' | 'O';
};

type Navigation = {
  goBack: () => void;
};

// PUBLIC_INTERFACE
export default function SettingsScreen({ navigation }: { navigation: Navigation }) {
  /** Settings page for toggling sound, choosing who starts, and AI symbol */
  const [settings, setSettings] = useState<Settings>({
    sound: true,
    firstPlayer: 'X',
    aiSymbol: 'O',
  });

  const toggle = (key: keyof Settings) => (value: boolean | 'X' | 'O') =>
    setSettings((s) => ({ ...s, [key]: value }));

  return (
    <View style={styles.container}>
      <GradientHeader title="Settings" right={<AppButton variant="ghost" onPress={() => navigation.goBack()}>Done</AppButton>} />
      <View style={styles.content}>
        <Card style={{ gap: 14 }}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Sound</Text>
            <Switch
              value={settings.sound}
              onValueChange={(v) => toggle('sound')(v)}
              thumbColor={settings.sound ? theme.colors.secondary : '#f1f5f9'}
              trackColor={{ true: '#fde68a', false: '#e5e7eb' }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>First Player</Text>
            <View style={styles.segmentLike}>
              <AppButton
                variant={settings.firstPlayer === 'X' ? 'primary' : 'ghost'}
                onPress={() => toggle('firstPlayer')('X')}
                style={{ flex: 1 }}
              >
                X
              </AppButton>
              <AppButton
                variant={settings.firstPlayer === 'O' ? 'primary' : 'ghost'}
                onPress={() => toggle('firstPlayer')('O')}
                style={{ flex: 1 }}
              >
                O
              </AppButton>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>AI Symbol</Text>
            <View style={styles.segmentLike}>
              <AppButton
                variant={settings.aiSymbol === 'X' ? 'secondary' : 'ghost'}
                onPress={() => toggle('aiSymbol')('X')}
                style={{ flex: 1 }}
              >
                X
              </AppButton>
              <AppButton
                variant={settings.aiSymbol === 'O' ? 'secondary' : 'ghost'}
                onPress={() => toggle('aiSymbol')('O')}
                style={{ flex: 1 }}
              >
                O
              </AppButton>
            </View>
          </View>
          <Text style={styles.hint}>Settings are local to this session.</Text>
          <AppButton variant="ghost" onPress={() => navigation.goBack()}>Back</AppButton>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, padding: theme.layout.spacing },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
  rowLabel: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  segmentLike: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  hint: {
    marginTop: 8,
    color: theme.colors.muted,
    fontSize: 12,
  },
});
