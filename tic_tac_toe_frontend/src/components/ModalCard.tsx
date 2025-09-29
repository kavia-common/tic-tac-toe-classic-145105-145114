import React, { PropsWithChildren } from 'react';
import { Modal, View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';

type Props = PropsWithChildren<{
  visible: boolean;
  onRequestClose?: () => void;
  style?: ViewStyle;
}>;

// PUBLIC_INTERFACE
export default function ModalCard({ visible, onRequestClose, style, children }: Props) {
  /** Themed modal wrapper with dim backdrop and card styling for consistent dialogs */
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
      <View style={styles.backdrop}>
        <View style={[styles.card, style]}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.layout.spacing,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.radiusLg,
    padding: theme.layout.spacingLg,
    width: '100%',
    ...theme.shadow.card,
  },
});
