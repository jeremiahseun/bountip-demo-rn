import { ScrollView, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppText } from '@/components/ui/AppText';
import { CategoryChip } from '@/features/products/components/CategoryChip';
import { LastUpdatedLabel } from '@/features/products/components/LastUpdatedLabel';
import { ProductsBanner } from '@/features/products/components/ProductsBanner';
import { ALL_CATEGORY, type ProductFilterCategory } from '@/features/products/constants';
import { spacing } from '@/theme/tokens';

type ProductsListHeaderProps = {
  categories: ProductFilterCategory[];
  error: string | null;
  lastUpdated: string | null;
  onCategoryPress: (category: ProductFilterCategory) => void;
  onClearFilters: () => void;
  onSearchChange: (value: string) => void;
  searchValue: string;
  selectedCategory: ProductFilterCategory;
  showClearFilters: boolean;
};

function getCategoryLabel(category: ProductFilterCategory) {
  return category === ALL_CATEGORY ? 'All' : category;
}

export function ProductsListHeader({
  categories,
  error,
  lastUpdated,
  onCategoryPress,
  onClearFilters,
  onSearchChange,
  searchValue,
  selectedCategory,
  showClearFilters,
}: ProductsListHeaderProps) {
  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="eyebrow">Product catalogue</AppText>
          <AppText variant="heading">Browse the latest products</AppText>
          <AppText color="secondary">
            Search by title, filter by category, and refresh the catalogue whenever you need a new
            snapshot.
          </AppText>
          <LastUpdatedLabel value={lastUpdated} />
        </View>

        {showClearFilters ? <AppButton label="Clear filters" onPress={onClearFilters} /> : null}
      </View>

      {error ? <ProductsBanner message={error} /> : null}

      <AppInput
        accessibilityLabel="Search products"
        autoCapitalize="none"
        autoCorrect={false}
        label="Search by product title"
        onChangeText={onSearchChange}
        placeholder="Search products"
        returnKeyType="search"
        value={searchValue}
      />

      <View style={styles.filters}>
        <AppText variant="label">Categories</AppText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chips}>
            {categories.map((category) => (
              <CategoryChip
                active={category === selectedCategory}
                key={category}
                label={getCategoryLabel(category)}
                onPress={() => onCategoryPress(category)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chips: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xs,
  },
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.lg,
  },
  copy: {
    gap: spacing.sm,
  },
  filters: {
    gap: spacing.sm,
  },
  header: {
    gap: spacing.md,
  },
});
