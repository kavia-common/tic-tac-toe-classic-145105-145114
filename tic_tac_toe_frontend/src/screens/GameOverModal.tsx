import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import ScreenContainer from '../components/ScreenContainer';
import Typography from '../components/Typography';
import PrimaryButton from '../components/PrimaryButton';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/colors';
import { radii, shadows } from '../theme/shadows';

/**
 * PUBLIC_INTERFACE
 * GameOverModal
 * Presented when a game ends; allows play again or go home.
 */
type Props = NativeStackScreenProps<RootStackParamList, 'GameOverModal'>;

const GameOverModal: React.FC<Props> = ({ route, navigation }) => {
  const { result, onPlayAgain, onHome } = route.params;

  const title =
    result === 'DRAW' ? 'Draw!' : result === 'X_WON' ? 'X Wins!' : 'O Wins!';
  const color =
    result === 'DRAW' ? colors.mutedText : result === 'X_WON' ? colors.primary : colors.secondary;

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Typography variant="title" style={{ color, marginBottom: spacing.xl }}>{title}</Typography>
        <PrimaryButton
          label="Play Again"
          onPress={() => {
            if (onPlayAgain) onPlayAgain();
            navigation.goBack();
          }}
          style={{ marginBottom: spacing.lg }}
        />
        <PrimaryButton
          label="Home"
          variant="secondary"
          onPress={() => {
            if (onHome) onHome();
            navigation.popToTop();
          }}
        />
      </View>
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
    alignItems: 'center',
  },
});

export default GameOverModal;
