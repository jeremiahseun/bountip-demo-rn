import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';

import { colors, typography } from '@/theme/tokens';

type AppTextVariant = keyof typeof typography;
type AppTextColor = 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent';

type AppTextProps = PropsWithChildren<{
  color?: AppTextColor;
  style?: StyleProp<TextStyle>;
  variant?: AppTextVariant;
}>;

const colorMap: Record<AppTextColor, string> = {
  primary: colors.textPrimary,
  secondary: colors.textSecondary,
  muted: colors.textMuted,
  inverse: colors.textInverse,
  accent: colors.accent,
};

export function AppText({
  children,
  color = 'primary',
  style,
  variant = 'body',
}: AppTextProps) {
  return (
    <Text style={[styles.base, typography[variant], { color: colorMap[color] }, style]}>
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
