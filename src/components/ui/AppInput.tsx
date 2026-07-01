import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Icon, type IconName } from '@/components/ui/Icon';
import { radius, spacing, typography } from '@/theme/tokens';
import { useTheme, useThemedStyles, type Theme } from '@/theme/useTheme';

type AppInputProps = TextInputProps & {
  label?: string;
  leadingIcon?: IconName;
  onClear?: () => void;
};

export function AppInput({
  label,
  leadingIcon,
  onClear,
  onBlur,
  onFocus,
  style,
  value,
  ...props
}: AppInputProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [isFocused, setIsFocused] = useState(false);
  const showClear = Boolean(onClear) && Boolean(value);

  return (
    <View style={styles.wrapper}>
      {label ? (
        <AppText variant="label" color="secondary">
          {label}
        </AppText>
      ) : null}

      <View style={[styles.field, isFocused && styles.fieldFocused]}>
        {leadingIcon ? (
          <Icon
            color={isFocused ? colors.accent : colors.textMuted}
            name={leadingIcon}
            size={20}
          />
        ) : null}

        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[styles.input, style]}
          value={value}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          {...props}
        />

        {showClear ? (
          <Pressable
            accessibilityLabel="Clear search"
            accessibilityRole="button"
            hitSlop={8}
            onPress={onClear}
            style={styles.clearButton}
          >
            <Icon color={colors.textMuted} name="close-circle" size={18} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    wrapper: {
      gap: spacing.sm,
    },
    field: {
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.lg,
      borderWidth: 1,
      flexDirection: 'row',
      gap: spacing.sm,
      minHeight: 52,
      paddingHorizontal: spacing.md,
    },
    fieldFocused: {
      borderColor: colors.accent,
    },
    input: {
      color: colors.textPrimary,
      flex: 1,
      fontSize: typography.body.fontSize,
      paddingVertical: spacing.sm,
    },
    clearButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
