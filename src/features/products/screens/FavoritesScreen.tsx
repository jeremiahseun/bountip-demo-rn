import { type Href, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/AppText';
import { ProductsEmptyState } from '@/features/products/components/ProductsEmptyState';
import { ProductsErrorState } from '@/features/products/components/ProductsErrorState';
import { ProductsList } from '@/features/products/components/ProductsList';
import { ProductsLoadingState } from '@/features/products/components/ProductsLoadingState';
import { useEnsureProductsLoaded } from '@/features/products/hooks/useEnsureProductsLoaded';
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore';
import {
  selectProducts,
  selectProductsError,
  selectProductsHydrated,
  selectProductsStatus,
} from '@/features/products/store/productSelectors';
import { useProductsStore } from '@/features/products/store/useProductsStore';
import { spacing } from '@/theme/tokens';
import { useThemedStyles, type Theme } from '@/theme/useTheme';

export function FavoritesScreen() {
  const router = useRouter();
  const styles = useThemedStyles(makeStyles);

  useEnsureProductsLoaded();

  const products = useProductsStore(selectProducts);
  const status = useProductsStore(selectProductsStatus);
  const error = useProductsStore(selectProductsError);
  const hasHydrated = useProductsStore(selectProductsHydrated);
  const loadProducts = useProductsStore((state) => state.loadProducts);
  const refreshProducts = useProductsStore((state) => state.refreshProducts);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const favoriteProducts = useMemo(
    () => products.filter((product) => favoriteIds.includes(product.id)),
    [favoriteIds, products],
  );

  const isLoading = !hasHydrated || (status === 'loading' && products.length === 0);
  const showErrorState = status === 'error' && products.length === 0;
  const showEmptyState = favoriteProducts.length === 0;

  if (isLoading) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.centeredContainer}>
          <ProductsLoadingState />
        </View>
      </SafeAreaView>
    );
  }

  if (showErrorState && error) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.centeredContainer}>
          <ProductsErrorState message={error} onRetry={() => void loadProducts()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ProductsList
        favoriteIds={favoriteIds}
        ListEmptyComponent={
          showEmptyState ? (
            <ProductsEmptyState onClearFilters={() => router.navigate('/')} variant="favorites" />
          ) : null
        }
        ListHeaderComponent={<FavoritesHeader count={favoriteProducts.length} />}
        onPressProduct={(id) => router.push(`/products/${id}` as Href)}
        onRefresh={() => void refreshProducts()}
        onToggleFavorite={toggleFavorite}
        products={favoriteProducts}
        refreshing={status === 'refreshing'}
      />
    </SafeAreaView>
  );
}

function FavoritesHeader({ count }: { count: number }) {
  const styles = useThemedStyles(makeStyles);
  const subtitle =
    count === 0
      ? 'Products you save will appear here.'
      : `${count} saved ${count === 1 ? 'product' : 'products'}.`;

  return (
    <View style={styles.header}>
      <AppText color="accent" variant="eyebrow">
        Your collection
      </AppText>
      <AppText variant="heading">Favorites</AppText>
      <AppText color="secondary">{subtitle}</AppText>
    </View>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    header: {
      gap: spacing.sm,
      paddingBottom: spacing.lg,
      paddingTop: spacing.sm,
    },
    safeArea: {
      backgroundColor: colors.background,
      flex: 1,
    },
  });
