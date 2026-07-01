import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Icon } from '@/components/ui/Icon';
import { spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

type LastUpdatedLabelProps = {
  value: string | null;
};

export function LastUpdatedLabel({ value }: LastUpdatedLabelProps) {
  const { colors } = useTheme();

  if (!value) {
    return null;
  }

  const formatted = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));

  return (
    <View style={styles.row}>
      <Icon color={colors.textMuted} name="time-outline" size={14} />
      <AppText color="muted" variant="caption">
        Updated {formatted}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
});
