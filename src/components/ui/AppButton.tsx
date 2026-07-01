import type { PressableProps } from 'react-native';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Icon, type IconName } from '@/components/ui/Icon';
import { radius, spacing } from '@/theme/tokens';
import { useTheme, useThemedStyles, type Theme } from '@/theme/useTheme';

type AppButtonVariant = 'primary' | 'secondary';

type AppButtonProps = PressableProps & {
  icon?: IconName;
  label: string;
  loading?: boolean;
  variant?: AppButtonVariant;
};

export function AppButton({
  disabled,
  icon,
  label,
  loading = false,
  style,
  variant = 'primary',
  ...props
}: AppButtonProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const isDisabled = disabled || loading;
  const isPrimary = variant === 'primary';
  const contentColor = isPrimary ? colors.onAccent : colors.textPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: Boolean(isDisabled) }}
      disabled={isDisabled}
      style={(state) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        isDisabled && styles.disabled,
        state.pressed && !isDisabled && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={contentColor} />
      ) : (
        <View style={styles.content}>
          {icon ? <Icon color={contentColor} name={icon} size={18} /> : null}
          <AppText color={isPrimary ? 'onAccent' : 'primary'} variant="button">
            {label}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: radius.full,
      justifyContent: 'center',
      minHeight: 52,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.sm,
    },
    primary: {
      backgroundColor: colors.accent,
    },
    secondary: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
    },
    disabled: {
      opacity: 0.55,
    },
    pressed: {
      opacity: 0.9,
    },
  });
