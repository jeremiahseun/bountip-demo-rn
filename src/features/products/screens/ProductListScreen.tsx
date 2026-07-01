import { type Href, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductsEmptyState } from '@/features/products/components/ProductsEmptyState';
import { ProductsErrorState } from '@/features/products/components/ProductsErrorState';
import { ProductsList } from '@/features/products/components/ProductsList';
import { ProductsListHeader } from '@/features/products/components/ProductsListHeader';
import { ProductsLoadingState } from '@/features/products/components/ProductsLoadingState';
import { ALL_CATEGORY } from '@/features/products/constants';
import { useEnsureProductsLoaded } from '@/features/products/hooks/useEnsureProductsLoaded';
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore';
import {
  selectCategories,
  selectFilteredProducts,
  selectProducts,
  selectProductsError,
  selectProductsHydrated,
  selectProductsLastUpdated,
  selectProductsStatus,
  selectSearchQuery,
  selectSelectedCategory,
} from '@/features/products/store/productSelectors';
import { useProductsStore } from '@/features/products/store/useProductsStore';
import { spacing } from '@/theme/tokens';
import { useThemedStyles, type Theme } from '@/theme/useTheme';

export function ProductListScreen() {
  const router = useRouter();
  const styles = useThemedStyles(makeStyles);

  useEnsureProductsLoaded();

  const products = useProductsStore(selectProducts);
  const filteredProducts = useProductsStore(selectFilteredProducts);
  const categories = useProductsStore(selectCategories);
  const status = useProductsStore(selectProductsStatus);
  const error = useProductsStore(selectProductsError);
  const hasHydrated = useProductsStore(selectProductsHydrated);
  const searchQuery = useProductsStore(selectSearchQuery);
  const selectedCategory = useProductsStore(selectSelectedCategory);
  const lastUpdated = useProductsStore(selectProductsLastUpdated);
  const loadProducts = useProductsStore((state) => state.loadProducts);
  const refreshProducts = useProductsStore((state) => state.refreshProducts);
  const setCategory = useProductsStore((state) => state.setCategory);
  const setSearchQuery = useProductsStore((state) => state.setSearchQuery);
  const clearFilters = useProductsStore((state) => state.clearFilters);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const [draftSearch, setDraftSearch] = useState(searchQuery);

  useEffect(() => {
    setDraftSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(draftSearch);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [draftSearch, setSearchQuery]);

  const isLoading = !hasHydrated || (status === 'loading' && products.length === 0);
  const isRefreshing = status === 'refreshing';
  const hasFilters = searchQuery.trim().length > 0 || selectedCategory !== ALL_CATEGORY;
  const showErrorState = status === 'error' && products.length === 0;
  const showEmptyState = hasHydrated && status === 'success' && filteredProducts.length === 0;
  const showInlineError = Boolean(error) && products.length > 0;

  function handleClearSearch() {
    setDraftSearch('');
    setSearchQuery('');
  }

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
            <ProductsEmptyState onClearFilters={clearFilters} variant="filters" />
          ) : null
        }
        ListHeaderComponent={
          <ProductsListHeader
            categories={categories}
            error={showInlineError ? error : null}
            lastUpdated={lastUpdated}
            onCategoryPress={setCategory}
            onClearFilters={clearFilters}
            onClearSearch={handleClearSearch}
            onSearchChange={setDraftSearch}
            resultCount={filteredProducts.length}
            searchValue={draftSearch}
            selectedCategory={selectedCategory}
            showClearFilters={hasFilters}
          />
        }
        onPressProduct={(id) => router.push(`/products/${id}` as Href)}
        onRefresh={() => void refreshProducts()}
        onToggleFavorite={toggleFavorite}
        products={filteredProducts}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    safeArea: {
      backgroundColor: colors.background,
      flex: 1,
    },
  });
