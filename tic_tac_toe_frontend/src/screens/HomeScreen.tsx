import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AppButton, Card, GradientHeader } from '../components/UI';
import { theme, typography } from '../theme';
import type { HomeScreenProps } from '../types/navigation';
import AppIcon from '../../assets/icon.png';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <GradientHeader title="Tic Tac Toe" subtitle="Ocean Professional" right={
        <AppButton variant="ghost" onPress={() => navigation.navigate('Settings')}>
          Settings
        </AppButton>
      }/>
      <View style={styles.content}>
        <Card style={styles.heroCard}>
          <View style={styles.logoRow}>
            <Image source={AppIcon} resizeMode="contain" style={styles.logo}/>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>Classic Tic Tac Toe</Text>
              <Text style={styles.heroSubtitle}>Play vs a friend or challenge the AI</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <AppButton variant="primary" onPress={() => navigation.navigate('Game', { mode: 'AI' })}>
              Play vs AI
            </AppButton>
            <AppButton variant="secondary" onPress={() => navigation.navigate('Game', { mode: 'HUMAN' })}>
              2 Players
            </AppButton>
          </View>
        </Card>
        <View style={styles.footerNote}>
          <Text style={styles.noteText}>Modern. Minimal. Smooth.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.layout.spacing,
  },
  heroCard: {
    marginTop: theme.layout.spacing,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  heroTitle: {
    ...typography.title,
    color: theme.colors.text,
  },
  heroSubtitle: {
    ...typography.subtitle,
  },
  actions: {
    marginTop: theme.layout.spacingLg,
    flexDirection: 'row',
    gap: 12,
  },
  footerNote: {
    marginTop: theme.layout.spacingLg,
    alignItems: 'center',
  },
  noteText: {
    color: theme.colors.muted,
  },
});
