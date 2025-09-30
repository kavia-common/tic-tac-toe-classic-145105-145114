import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

/**
 * PUBLIC_INTERFACE
 * ScreenContainer
 * Provides standard background and padding with safe areas.
 */
const ScreenContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
});

export default ScreenContainer;
