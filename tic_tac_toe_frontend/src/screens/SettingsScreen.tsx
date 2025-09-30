import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import Toggle from '../components/Toggle';
import Button from '../components/Button';
import { useSettings } from '../hooks/useSettings';
import { NavLike } from '../theme/routerTypes';

// PUBLIC_INTERFACE
const SettingsScreen: React.FC<{ navigation: NavLike }> = ({ navigation }) => {
  /** Settings screen to configure opponent type and AI difficulty. */
  const t = useTheme();
  const { settings, setSettings, ready } = useSettings();

  if (!ready) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: t.colors.background, alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <Text style={{ color: t.colors.mutedText }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: t.colors.background }]}>
      <LinearGradient
        colors={t.gradients.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, t.shadow.md]}
      >
        <Text style={[styles.title, { color: t.colors.text }]}>Settings</Text>
      </LinearGradient>

      <View style={[styles.card, { backgroundColor: t.colors.surface, borderRadius: t.radius.lg }, t.shadow.md]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: t.colors.text }]}>Play vs AI</Text>
          <Toggle value={settings.vsAI} onChange={(v) => setSettings({ vsAI: v })} />
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: t.colors.text }]}>Player Starts (X)</Text>
          <Toggle value={settings.playerStarts} onChange={(v) => setSettings({ playerStarts: v })} />
        </View>

        <View style={styles.group}>
          <Text style={[styles.groupLabel, { color: t.colors.mutedText }]}>AI Difficulty</Text>
          <View style={styles.diffRow}>
            <Button
              title="Easy"
              variant={settings.aiLevel === 'easy' ? 'primary' : 'ghost'}
              onPress={() => setSettings({ aiLevel: 'easy' })}
            />
            <Button
              title="Medium"
              variant={settings.aiLevel === 'medium' ? 'primary' : 'ghost'}
              onPress={() => setSettings({ aiLevel: 'medium' })}
            />
            <Button
              title="Hard"
              variant={settings.aiLevel === 'hard' ? 'primary' : 'ghost'}
              onPress={() => setSettings({ aiLevel: 'hard' })}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Back" variant="secondary" onPress={() => navigation.goBack?.()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { borderRadius: 20, paddingVertical: 20, paddingHorizontal: 16, marginTop: 8 },
  title: { fontSize: 22, fontWeight: '900' },
  card: { marginTop: 16, padding: 16, gap: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { fontSize: 16, fontWeight: '700' },
  group: { marginTop: 8 },
  groupLabel: { fontSize: 12, fontWeight: '700', marginBottom: 8 },
  diffRow: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  footer: { marginTop: 24, alignItems: 'center' },
});

export default SettingsScreen;
