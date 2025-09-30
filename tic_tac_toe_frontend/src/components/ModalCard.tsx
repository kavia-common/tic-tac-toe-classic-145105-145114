import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Button from './Button';

type Props = {
  visible: boolean;
  title: string;
  message?: string;
  onClose: () => void;
  confirmText?: string;
  onConfirm?: () => void;
};

// PUBLIC_INTERFACE
const ModalCard: React.FC<Props> = ({ visible, title, message, onClose, confirmText, onConfirm, children }) => {
  /** Themed modal card with title, message, and optional confirm action. */
  const t = useTheme();
  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop} accessibilityRole="dialog">
        <View style={[styles.card, { backgroundColor: t.colors.surface, borderRadius: t.radius.xl }, t.shadow.lg]}>
          <Text style={[styles.title, { color: t.colors.text }]}>{title}</Text>
          {message ? <Text style={[styles.message, { color: t.colors.mutedText }]}>{message}</Text> : null}
          <View>{children}</View>
          <View style={styles.actions}>
            <Button title="Close" variant="ghost" onPress={onClose} />
            {confirmText ? <Button title={confirmText} variant="primary" onPress={onConfirm} /> : null}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    justifyContent: 'flex-end',
  },
});

export default ModalCard;
