import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductsEmptyState } from '@/features/products/components/ProductsEmptyState';
import { ProductsErrorState } from '@/features/products/components/ProductsErrorState';
import { ProductsListHeader } from '@/features/products/components/ProductsListHeader';
import { ProductsLoadingState } from '@/features/products/components/ProductsLoadingState';
import { ProductCard } from '@/features/products/components/ProductCard';
import { ALL_CATEGORY } from '@/features/products/constants';
import { selectCategories, selectFilteredProducts, selectProducts, selectProductsError, selectProductsHydrated, selectProductsLastUpdated, selectProductsStatus, selectSearchQuery, selectSelectedCategory } from '@/features/products/store/productSelectors';
import { useProductsStore } from '@/features/products/store/useProductsStore';
import { colors, spacing } from '@/theme/tokens';
import type { Product } from '@/types/product';

export function ProductListScreen() {
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

  const [draftSearch, setDraftSearch] = useState(searchQuery);

  useEffect(() => {
    setDraftSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (!hasHydrated || status !== 'idle') {
      return;
    }

    void loadProducts();
  }, [hasHydrated, loadProducts, status]);

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

  if (isLoading) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <Stack.Screen options={{ title: 'Products' }} />
        <View style={styles.loadingContainer}>
          <ProductsLoadingState />
        </View>
      </SafeAreaView>
    );
  }

  if (showErrorState && error) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <Stack.Screen options={{ title: 'Products' }} />
        <View style={styles.loadingContainer}>
          <ProductsErrorState message={error} onRetry={() => void loadProducts()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Products' }} />
      <FlashList
        ListEmptyComponent={
          showEmptyState ? <ProductsEmptyState onClearFilters={clearFilters} /> : null
        }
        ListFooterComponent={<View style={styles.footerSpacer} />}
        ListHeaderComponent={
          <ProductsListHeader
            categories={categories}
            error={showInlineError ? error : null}
            lastUpdated={lastUpdated}
            onCategoryPress={setCategory}
            onClearFilters={clearFilters}
            onSearchChange={setDraftSearch}
            searchValue={draftSearch}
            selectedCategory={selectedCategory}
            showClearFilters={hasFilters}
          />
        }
        contentContainerStyle={styles.contentContainer}
        data={filteredProducts}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={keyExtractor}
        onRefresh={() => void refreshProducts()}
        refreshing={isRefreshing}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

function renderItem({ item }: { item: Product }) {
  return <ProductCard product={item} />;
}

function keyExtractor(item: Product) {
  return item.id.toString();
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  footerSpacer: {
    height: spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  separator: {
    height: spacing.md,
  },
});
