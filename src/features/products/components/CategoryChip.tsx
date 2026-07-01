import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { radius, spacing } from '@/theme/tokens';
import { useThemedStyles, type Theme } from '@/theme/useTheme';

type CategoryChipProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

export function CategoryChip({ active, label, onPress }: CategoryChipProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active && styles.activeChip,
        pressed && styles.pressed,
      ]}
    >
      <AppText color={active ? 'inverse' : 'secondary'} style={styles.label} variant="label">
        {label}
      </AppText>
    </Pressable>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    chip: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.full,
      borderWidth: 1,
      minHeight: 38,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    activeChip: {
      backgroundColor: colors.textPrimary,
      borderColor: colors.textPrimary,
    },
    label: {
      textTransform: 'capitalize',
    },
    pressed: {
      opacity: 0.88,
    },
  });
