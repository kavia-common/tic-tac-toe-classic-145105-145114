import React from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, useThemeController } from '../theme/ThemeContext';
import Toggle from '../components/Toggle';
import Button from '../components/Button';
import { useSettings } from '../hooks/useSettings';
import { NavLike } from '../theme/routerTypes';
import { Animate } from '../utils/animations';
import { ThemeKey as ThemeKeyFromTheme } from '../theme/theme';

// PUBLIC_INTERFACE
const SettingsScreen: React.FC<{ navigation: NavLike }> = ({ navigation }) => {
  /** Settings screen to configure opponent type, AI difficulty, and theme. */
  const t = useTheme();
  const { changeTheme } = useThemeController();
  const { settings, setSettings, ready } = useSettings();

  const fade = React.useMemo(() => Animate.fadeIn(t.motion.normal, 0), [t.motion.normal]);
  React.useEffect(() => {
    fade.start();
  }, [fade]);

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

  const onSelectTheme = (key: ThemeKeyFromTheme) => {
    setSettings({ theme: key });
    changeTheme(key);
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: t.colors.background }, fade.style]}>
      <LinearGradient
        colors={t.gradients.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, t.shadow.md]}
      >
        <Text style={[styles.title, { color: t.colors.text }]} accessibilityRole="header">
          Settings
        </Text>
      </LinearGradient>

      <View style={[styles.card, { backgroundColor: t.colors.surface, borderRadius: t.radius.lg }, t.shadow.md]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: t.colors.text }]}>Play vs AI</Text>
          <Toggle
            value={settings.vsAI}
            onChange={(v) => setSettings({ vsAI: v })}
          />
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: t.colors.text }]}>Player Starts (X)</Text>
          <Toggle
            value={settings.playerStarts}
            onChange={(v) => setSettings({ playerStarts: v })}
          />
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

        <View style={styles.group}>
          <Text style={[styles.groupLabel, { color: t.colors.mutedText }]}>Theme</Text>
          <View style={styles.segmentRow} accessible accessibilityRole="radiogroup" accessibilityLabel="Theme selection">
            <Segment
              label="Ocean"
              selected={settings.theme === 'ocean'}
              onPress={() => onSelectTheme('ocean')}
              a11yLabel="Select Ocean theme"
            />
            <Segment
              label="Royal Dark"
              selected={settings.theme === 'royalDark'}
              onPress={() => onSelectTheme('royalDark')}
              a11yLabel="Select Royal Dark theme"
            />
            <Segment
              label="Purple Dream"
              selected={settings.theme === 'purpleDream'}
              onPress={() => onSelectTheme('purpleDream')}
              a11yLabel="Select Purple Dream theme"
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Back" variant="secondary" onPress={() => navigation.goBack?.()} />
      </View>
    </Animated.View>
  );
};

const Segment: React.FC<{ label: string; selected: boolean; onPress: () => void; a11yLabel: string }> = ({
  label,
  selected,
  onPress,
  a11yLabel,
}) => {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ selected }}
      style={[
        {
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: t.radius.md,
          borderWidth: 1,
          borderColor: selected ? t.colors.primary : t.colors.border,
          backgroundColor: selected ? t.colors.primary : 'transparent',
        },
      ]}
    >
      <Text style={{ color: selected ? '#ffffff' : t.colors.text, fontWeight: '800' }}>{label}</Text>
    </Pressable>
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
  segmentRow: { flexDirection: 'row', gap: 8, justifyContent: 'flex-start' },
  footer: { marginTop: 24, alignItems: 'center' },
});

export default SettingsScreen;
