import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppInput } from '@/components/ui/AppInput';
import { AppText } from '@/components/ui/AppText';
import { Icon } from '@/components/ui/Icon';
import { CategoryChip } from '@/features/products/components/CategoryChip';
import { LastUpdatedLabel } from '@/features/products/components/LastUpdatedLabel';
import { ProductsBanner } from '@/features/products/components/ProductsBanner';
import { ALL_CATEGORY, type ProductFilterCategory } from '@/features/products/constants';
import { spacing } from '@/theme/tokens';
import { useTheme, useThemedStyles, type Theme } from '@/theme/useTheme';

type ProductsListHeaderProps = {
  categories: ProductFilterCategory[];
  error: string | null;
  lastUpdated: string | null;
  onCategoryPress: (category: ProductFilterCategory) => void;
  onClearFilters: () => void;
  onClearSearch: () => void;
  onSearchChange: (value: string) => void;
  resultCount: number;
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
  onClearSearch,
  onSearchChange,
  resultCount,
  searchValue,
  selectedCategory,
  showClearFilters,
}: ProductsListHeaderProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.content}>
      <View style={styles.copy}>
        <AppText color="accent" variant="eyebrow">
          Product catalogue
        </AppText>
        <AppText variant="heading">Browse the latest products</AppText>
        <LastUpdatedLabel value={lastUpdated} />
      </View>

      <AppInput
        accessibilityLabel="Search products"
        autoCapitalize="none"
        autoCorrect={false}
        leadingIcon="search"
        onChangeText={onSearchChange}
        onClear={onClearSearch}
        placeholder="Search by product title"
        returnKeyType="search"
        value={searchValue}
      />

      {error ? <ProductsBanner message={error} /> : null}

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

      <View style={styles.resultsRow}>
        <AppText color="muted" variant="caption">
          {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </AppText>

        {showClearFilters ? (
          <Pressable
            accessibilityLabel="Clear filters"
            accessibilityRole="button"
            hitSlop={8}
            onPress={onClearFilters}
            style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
          >
            <Icon color={colors.accent} name="close" size={14} />
            <AppText color="accent" variant="label">
              Clear filters
            </AppText>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const makeStyles = (_theme: Theme) =>
  StyleSheet.create({
    chips: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.sm,
      paddingBottom: spacing.xs,
      paddingTop: spacing.xs,
    },
    clearButton: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.xs,
    },
    content: {
      gap: spacing.lg,
      paddingBottom: spacing.md,
      paddingTop: spacing.sm,
    },
    copy: {
      gap: spacing.sm,
    },
    filters: {
      gap: spacing.sm,
    },
    pressed: {
      opacity: 0.7,
    },
    resultsRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: 20,
    },
  });
