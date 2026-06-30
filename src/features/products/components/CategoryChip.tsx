import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, radius, spacing } from '@/theme/tokens';

type CategoryChipProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

export function CategoryChip({ active, label, onPress }: CategoryChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
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

const styles = StyleSheet.create({
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
