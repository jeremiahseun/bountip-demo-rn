import type { ReactElement } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { AppText } from '@/components/ui/AppText';
import { ProductCard } from '@/features/products/components/ProductCard';
import { spacing } from '@/theme/tokens';
import { useTheme, useThemedStyles, type Theme } from '@/theme/useTheme';
import type { Product } from '@/types/product';

type ProductsListProps = {
  ListEmptyComponent?: ReactElement | null;
  ListHeaderComponent?: ReactElement | null;
  favoriteIds: number[];
  onPressProduct: (productId: number) => void;
  onRefresh?: () => void;
  onToggleFavorite: (productId: number) => void;
  products: Product[];
  refreshing?: boolean;
};

/** How many cards to reveal per "page" of the infinite scroll. */
const PAGE_SIZE = 8;
/** Simulated load delay so the footer spinner is perceptible on a fast list. */
const LOAD_MORE_DELAY = 450;

/**
 * Shared product list used by both the Home and Favorites tabs. Owns the
 * client-side incremental rendering (infinite scroll) so the full payload is
 * revealed in pages with a visible loading footer instead of all at once.
 */
export function ProductsList({
  ListEmptyComponent,
  ListHeaderComponent,
  favoriteIds,
  onPressProduct,
  onRefresh,
  onToggleFavorite,
  products,
  refreshing,
}: ProductsListProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isPaging, setIsPaging] = useState(false);

  // Reset paging whenever the underlying data changes (filters, refresh, etc.).
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setIsPaging(false);
  }, [products]);

  const data = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);
  const canLoadMore = visibleCount < products.length;

  const handleEndReached = useCallback(() => {
    if (!canLoadMore || isPaging) {
      return;
    }

    setIsPaging(true);
    setTimeout(() => {
      setVisibleCount((count) => Math.min(count + PAGE_SIZE, products.length));
      setIsPaging(false);
    }, LOAD_MORE_DELAY);
  }, [canLoadMore, isPaging, products.length]);

  const footer = canLoadMore ? (
    <View style={styles.footerLoading}>
      <ActivityIndicator color={colors.accent} />
      <AppText color="muted" variant="caption">
        Loading more…
      </AppText>
    </View>
  ) : products.length > PAGE_SIZE ? (
    <View style={styles.footerEnd}>
      <AppText color="muted" variant="caption">
        You’ve reached the end
      </AppText>
    </View>
  ) : (
    <View style={styles.footerSpacer} />
  );

  return (
    <FlashList
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={footer}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={styles.contentContainer}
      data={data}
      extraData={favoriteIds}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={keyExtractor}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.4}
      onRefresh={onRefresh}
      refreshing={refreshing ?? false}
      renderItem={({ item }) => (
        <ProductCard
          isFavorite={favoriteIds.includes(item.id)}
          onPress={() => onPressProduct(item.id)}
          onToggleFavorite={() => onToggleFavorite(item.id)}
          product={item}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

function ItemSeparator() {
  return <View style={{ height: spacing.md }} />;
}

function keyExtractor(item: Product) {
  return item.id.toString();
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    contentContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
    },
    footerLoading: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.sm,
      justifyContent: 'center',
      paddingVertical: spacing.xl,
    },
    footerEnd: {
      alignItems: 'center',
      paddingVertical: spacing.xl,
    },
    footerSpacer: {
      height: spacing.xl,
    },
  });
