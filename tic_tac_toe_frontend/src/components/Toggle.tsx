import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  value: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
  disabled?: boolean;
};

// PUBLIC_INTERFACE
const Toggle: React.FC<Props> = ({ value, onChange, disabled }) => {
  /** Simple themed toggle control. */
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ disabled, checked: value }}
      onPress={() => !disabled && onChange?.(!value)}
      style={[
        styles.track,
        { backgroundColor: value ? t.colors.primary : '#e5e7eb', borderRadius: 9999 },
        disabled ? { opacity: 0.6 } : null,
      ]}
    >
      <View
        style={[
          styles.thumb,
          {
            backgroundColor: '#ffffff',
            borderRadius: 9999,
            transform: [{ translateX: value ? 20 : 0 }],
            borderColor: value ? t.colors.primary : '#d1d5db',
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderWidth: 1,
  },
});

export default Toggle;
