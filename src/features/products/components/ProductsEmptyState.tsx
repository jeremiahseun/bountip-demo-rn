import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { spacing } from '@/theme/tokens';

type ProductsEmptyStateProps = {
  onClearFilters: () => void;
};

export function ProductsEmptyState({ onClearFilters }: ProductsEmptyStateProps) {
  return (
    <AppCard>
      <View style={styles.content}>
        <AppText variant="subheading">No products match your filters</AppText>
        <AppText color="secondary">
          Try another search term or reset the selected category to see the full catalogue again.
        </AppText>
        <AppButton label="Clear filters" onPress={onClearFilters} />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
});
