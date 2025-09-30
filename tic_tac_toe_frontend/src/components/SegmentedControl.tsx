import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Text } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { radii, shadows } from '../theme/shadows';
import { typography } from '../theme/typography';

type Option<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  style?: ViewStyle;
};

/**
 * PUBLIC_INTERFACE
 * SegmentedControl
 * Reusable segmented control with Ocean style.
 */
function SegmentedControlInner<T extends string>({ options, value, onChange, style }: Props<T>) {
  return (
    <View style={[styles.container, style]}>
      {options.map((opt, idx) => {
        const selected = value === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[
              styles.segment,
              selected ? styles.selected : styles.unselected,
              idx === 0 ? styles.left : idx === options.length - 1 ? styles.right : styles.middle,
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: selected ? '#fff' : colors.text, opacity: selected ? 1 : 0.8 },
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.subtle,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: colors.primary,
  },
  unselected: {
    backgroundColor: 'transparent',
  },
  left: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  right: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  middle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: colors.border,
    borderRightColor: colors.border,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: '500',
  },
});

const SegmentedControl = <T extends string,>(props: Props<T>): React.ReactElement => {
  return SegmentedControlInner<T>(props);
};
export default SegmentedControl;
