import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { colors, typography } from '@/theme/tokens';

type AppTextVariant = keyof typeof typography;
type AppTextColor = 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent' | 'danger';

type AppTextProps = PropsWithChildren<{
  color?: AppTextColor;
  style?: StyleProp<TextStyle>;
  variant?: AppTextVariant;
}> &
  TextProps;

const colorMap: Record<AppTextColor, string> = {
  primary: colors.textPrimary,
  secondary: colors.textSecondary,
  muted: colors.textMuted,
  inverse: colors.textInverse,
  accent: colors.accent,
  danger: colors.danger,
};

export function AppText({
  children,
  color = 'primary',
  style,
  variant = 'body',
  ...textProps
}: AppTextProps) {
  return (
    <Text
      style={[styles.base, typography[variant], { color: colorMap[color] }, style]}
      {...textProps}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
