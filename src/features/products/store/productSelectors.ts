import type { Product } from '@/types/product';

import { ALL_CATEGORY, type ProductFilterCategory } from '@/features/products/constants';
import type { ProductsStoreState } from '@/features/products/store/useProductsStore';

export function normalizeSearchQuery(query: string) {
  return query.trim().toLowerCase();
}

export function filterProducts(
  products: Product[],
  searchQuery: string,
  selectedCategory: ProductFilterCategory,
) {
  const normalizedQuery = normalizeSearchQuery(searchQuery);

  return products.filter((product) => {
    const matchesCategory =
      selectedCategory === ALL_CATEGORY || product.category === selectedCategory;
    const matchesSearch =
      normalizedQuery.length === 0 || product.title.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });
}

const memoizedCategories = (() => {
  let lastProducts: Product[] | null = null;
  let lastValue: ProductFilterCategory[] = [ALL_CATEGORY];

  return (products: Product[]) => {
    if (products === lastProducts) {
      return lastValue;
    }

    lastProducts = products;
    lastValue = [
      ALL_CATEGORY,
      ...Array.from(new Set(products.map((product) => product.category))).sort((left, right) =>
        left.localeCompare(right),
      ),
    ];

    return lastValue;
  };
})();

const memoizedFilteredProducts = (() => {
  let lastProducts: Product[] | null = null;
  let lastSearchQuery = '';
  let lastCategory: ProductFilterCategory = ALL_CATEGORY;
  let lastValue: Product[] = [];

  return (products: Product[], searchQuery: string, selectedCategory: ProductFilterCategory) => {
    if (
      products === lastProducts &&
      searchQuery === lastSearchQuery &&
      selectedCategory === lastCategory
    ) {
      return lastValue;
    }

    lastProducts = products;
    lastSearchQuery = searchQuery;
    lastCategory = selectedCategory;
    lastValue = filterProducts(products, searchQuery, selectedCategory);

    return lastValue;
  };
})();

export const selectProducts = (state: ProductsStoreState) => state.products;
export const selectProductsStatus = (state: ProductsStoreState) => state.status;
export const selectProductsError = (state: ProductsStoreState) => state.error;
export const selectProductsHydrated = (state: ProductsStoreState) => state.hasHydrated;
export const selectProductsLastUpdated = (state: ProductsStoreState) => state.lastUpdated;
export const selectSelectedCategory = (state: ProductsStoreState) => state.selectedCategory;
export const selectSearchQuery = (state: ProductsStoreState) => state.searchQuery;

export const selectCategories = (state: ProductsStoreState) => memoizedCategories(state.products);

export const selectFilteredProducts = (state: ProductsStoreState) =>
  memoizedFilteredProducts(state.products, state.searchQuery, state.selectedCategory);

export const selectProductById = (id: number) => (state: ProductsStoreState) =>
  state.products.find((product) => product.id === id);
