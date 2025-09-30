import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  x: number;
  o: number;
  draws: number;
};

// PUBLIC_INTERFACE
const ScoreBar: React.FC<Props> = ({ x, o, draws }) => {
  /** Displays current score in a themed bar. */
  const t = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: t.colors.surface, borderRadius: t.radius.lg }, t.shadow.sm]}>
      <View style={styles.item}>
        <Text style={[styles.label, { color: t.colors.mutedText }]}>X</Text>
        <Text style={[styles.value, { color: t.colors.text }]}>{x}</Text>
      </View>
      <View style={[styles.item, styles.mid]}>
        <Text style={[styles.label, { color: t.colors.mutedText }]}>Draws</Text>
        <Text style={[styles.value, { color: t.colors.text }]}>{draws}</Text>
      </View>
      <View style={styles.item}>
        <Text style={[styles.label, { color: t.colors.mutedText }]}>O</Text>
        <Text style={[styles.value, { color: t.colors.text }]}>{o}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  item: {
    alignItems: 'center',
    minWidth: 80,
  },
  mid: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  value: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '800',
  },
});

export default ScoreBar;
