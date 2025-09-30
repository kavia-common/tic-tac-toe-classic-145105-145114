import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import Typography from './Typography';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type ToggleProps = {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
};

/**
 * PUBLIC_INTERFACE
 * ToggleRow
 * A row with a text label and Switch control.
 */
export const ToggleRow: React.FC<ToggleProps> = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.row}>
      <Typography variant="body">{label}</Typography>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? colors.secondary : '#f4f3f4'}
        trackColor={{ false: '#e5e7eb', true: '#fde68a' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
