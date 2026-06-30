import { useEffect } from 'react';

import {
  selectProductsHydrated,
  selectProductsStatus,
} from '@/features/products/store/productSelectors';
import { useProductsStore } from '@/features/products/store/useProductsStore';

/**
 * Triggers the initial catalogue fetch once the persisted store has hydrated.
 * Safe to call from multiple screens (Home, Favorites) — the store guards
 * against concurrent/duplicate loads.
 */
export function useEnsureProductsLoaded() {
  const status = useProductsStore(selectProductsStatus);
  const hasHydrated = useProductsStore(selectProductsHydrated);
  const loadProducts = useProductsStore((state) => state.loadProducts);

  useEffect(() => {
    if (!hasHydrated || status !== 'idle') {
      return;
    }

    void loadProducts();
  }, [hasHydrated, loadProducts, status]);
}
