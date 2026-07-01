import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import type { Palette } from '@/theme/tokens';
import { typography } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

type AppTextVariant = keyof typeof typography;
type AppTextColor = 'primary' | 'secondary' | 'muted' | 'inverse' | 'onAccent' | 'accent' | 'danger';

type AppTextProps = PropsWithChildren<{
  color?: AppTextColor;
  style?: StyleProp<TextStyle>;
  variant?: AppTextVariant;
}> &
  TextProps;

function resolveColor(palette: Palette, color: AppTextColor): string {
  const colorMap: Record<AppTextColor, string> = {
    primary: palette.textPrimary,
    secondary: palette.textSecondary,
    muted: palette.textMuted,
    inverse: palette.textInverse,
    onAccent: palette.onAccent,
    accent: palette.accent,
    danger: palette.danger,
  };

  return colorMap[color];
}

export function AppText({
  children,
  color = 'primary',
  style,
  variant = 'body',
  ...textProps
}: AppTextProps) {
  const { colors } = useTheme();

  return (
    <Text
      style={[styles.base, typography[variant], { color: resolveColor(colors, color) }, style]}
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
