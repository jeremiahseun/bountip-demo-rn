import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { fetchProductById, fetchProducts } from '@/features/products/api/productsApi';
import { ALL_CATEGORY, type ProductFilterCategory } from '@/features/products/constants';
import type { Product, ProductsStatus } from '@/types/product';

type PersistedProductsState = {
  lastUpdated: string | null;
  products: Product[];
};

export type ProductsStoreState = PersistedProductsState & {
  error: string | null;
  hasHydrated: boolean;
  loadProducts: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  resolveProductById: (productId: number) => Promise<Product>;
  searchQuery: string;
  selectedCategory: ProductFilterCategory;
  setCategory: (category: ProductFilterCategory) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  setSearchQuery: (query: string) => void;
  upsertProduct: (product: Product) => void;
  clearFilters: () => void;
  status: ProductsStatus;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong while loading products.';
}

async function runProductsRequest(forceRefresh: boolean) {
  const state = useProductsStore.getState();
  const hasCachedProducts = state.products.length > 0;
  const nextStatus: ProductsStatus = forceRefresh || hasCachedProducts ? 'refreshing' : 'loading';

  useProductsStore.setState({
    error: null,
    status: nextStatus,
  });

  try {
    const products = await fetchProducts();

    useProductsStore.setState({
      error: null,
      lastUpdated: new Date().toISOString(),
      products,
      status: 'success',
    });
  } catch (error) {
    const message = getErrorMessage(error);

    useProductsStore.setState((currentState) => ({
      error: message,
      status: currentState.products.length > 0 ? 'success' : 'error',
    }));
  }
}

export const useProductsStore = create<ProductsStoreState>()(
  persist(
    (set, get) => ({
      error: null,
      hasHydrated: false,
      lastUpdated: null,
      products: [],
      searchQuery: '',
      selectedCategory: ALL_CATEGORY,
      status: 'idle',
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setCategory: (category) => set({ selectedCategory: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearFilters: () =>
        set({
          searchQuery: '',
          selectedCategory: ALL_CATEGORY,
        }),
      loadProducts: async () => {
        const { status } = get();

        if (status === 'loading' || status === 'refreshing') {
          return;
        }

        await runProductsRequest(false);
      },
      refreshProducts: async () => {
        const { status } = get();

        if (status === 'loading' || status === 'refreshing') {
          return;
        }

        await runProductsRequest(true);
      },
      resolveProductById: async (productId) => {
        const cachedProduct = get().products.find((product) => product.id === productId);

        if (cachedProduct) {
          return cachedProduct;
        }

        const product = await fetchProductById(productId);

        get().upsertProduct(product);

        return product;
      },
      upsertProduct: (product) =>
        set((state) => {
          const existingIndex = state.products.findIndex((current) => current.id === product.id);

          if (existingIndex === -1) {
            return {
              lastUpdated: state.lastUpdated ?? new Date().toISOString(),
              products: [product, ...state.products],
            };
          }

          const nextProducts = [...state.products];
          nextProducts[existingIndex] = product;

          return {
            products: nextProducts,
          };
        }),
    }),
    {
      name: 'products-cache',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        lastUpdated: state.lastUpdated,
        products: state.products,
      }),
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return {
            lastUpdated: null,
            products: [],
          };
        }

        return persistedState as PersistedProductsState;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
