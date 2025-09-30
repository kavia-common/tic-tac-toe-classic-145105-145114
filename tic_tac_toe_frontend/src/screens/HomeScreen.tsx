import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { useTheme } from '../theme/ThemeContext';

type RouteName = 'Home' | 'Game' | 'Settings';
type NavLike = { navigate: (route: RouteName) => void };

// PUBLIC_INTERFACE
const HomeScreen: React.FC<{ navigation: NavLike }> = ({ navigation }) => {
  /** Home screen with app title and quick actions. */
  const t = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: t.colors.background }]}>
      <LinearGradient
        colors={t.gradients.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, t.shadow.md]}
      >
        <Text style={[styles.title, { color: t.colors.text }]}>Tic Tac Toe</Text>
        <Text style={[styles.subtitle, { color: t.colors.mutedText }]}>Ocean Professional</Text>
      </LinearGradient>

      <View style={styles.actions}>
        <Button title="Start Game" variant="primary" onPress={() => navigation.navigate('Game')} />
        <Button title="Settings" variant="secondary" onPress={() => navigation.navigate('Settings')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginTop: 24,
  },
  title: { fontSize: 28, fontWeight: '900', letterSpacing: 0.5 },
  subtitle: { marginTop: 4, fontSize: 14, fontWeight: '600' },
  actions: { marginTop: 32, gap: 12 },
});

export default HomeScreen;
