import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';

type Variant = 'title' | 'subtitle' | 'body' | 'caption';

type Props = TextProps & {
  variant?: Variant;
  color?: string;
};

/**
 * PUBLIC_INTERFACE
 * Typography
 * Consistent text component with theme sizes/weights/colors.
 */
const Typography: React.FC<Props> = ({ variant = 'body', color, style, children, ...rest }) => {
  return (
    <Text style={[styles[variant], color ? { color } : null, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.mutedText,
  },
  body: {
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.text,
  },
  caption: {
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.mutedText,
  },
});

export default Typography;
