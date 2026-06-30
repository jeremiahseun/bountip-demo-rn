import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type AppInputProps = TextInputProps & {
  label?: string;
};

export function AppInput({ label, style, ...props }: AppInputProps) {
  return (
    <View style={styles.wrapper}>
      {label ? (
        <AppText variant="label" color="secondary">
          {label}
        </AppText>
      ) : null}
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    minHeight: 52,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
