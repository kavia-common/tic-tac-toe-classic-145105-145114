import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { GradientHeader, Card, AppButton } from '../components/UI';
import { theme, typography } from '../theme';

// PUBLIC_INTERFACE
export default function AboutScreen({ navigation }: { navigation: { goBack: () => void } }) {
  /** About screen: brief info and helpful links */
  return (
    <View style={styles.container}>
      <GradientHeader
        title="About"
        subtitle="Tic Tac Toe • Ocean Professional"
        right={<AppButton variant="ghost" onPress={() => navigation.goBack()}>Close</AppButton>}
      />
      <View style={styles.content}>
        <Card style={{ gap: 12 }}>
          <Text style={styles.title}>Tic Tac Toe</Text>
          <Text style={styles.text}>
            A modern, minimal Tic Tac Toe game built with React Native (Expo), themed with Ocean Professional.
          </Text>
          <Text style={styles.text}>Play vs a friend or challenge the AI.</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
            <AppButton variant="secondary" onPress={() => Linking.openURL('https://reactnative.dev/')}>React Native</AppButton>
            <AppButton variant="ghost" onPress={() => Linking.openURL('https://docs.expo.dev/')}>Expo Docs</AppButton>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, padding: theme.layout.spacing },
  title: { ...typography.title, color: theme.colors.text },
  text: { color: theme.colors.muted, fontSize: 14, lineHeight: 20 },
});
