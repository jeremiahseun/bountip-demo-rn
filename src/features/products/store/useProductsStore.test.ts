import { act } from '@testing-library/react-native';

import { useProductsStore } from '@/features/products/store/useProductsStore';
import type { Product } from '@/types/product';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@/features/products/api/productsApi', () => ({
  fetchProductById: jest.fn(),
  fetchProducts: jest.fn(),
}));

const { fetchProducts } = jest.requireMock('@/features/products/api/productsApi') as {
  fetchProducts: jest.Mock;
};

const mockProducts: Product[] = [
  {
    category: 'electronics',
    description: 'A premium over-ear headset with noise cancellation.',
    id: 1,
    image: 'https://example.com/headphones.png',
    price: 199.99,
    rating: { count: 12, rate: 4.8 },
    title: 'Studio Headphones',
  },
  {
    category: 'men clothing',
    description: 'A relaxed fit jacket for cool weather.',
    id: 2,
    image: 'https://example.com/jacket.png',
    price: 89.5,
    rating: { count: 5, rate: 4.2 },
    title: 'Weekend Jacket',
  },
];

function resetProductsStore() {
  useProductsStore.setState({
    error: null,
    hasHydrated: true,
    lastUpdated: null,
    products: [],
    searchQuery: '',
    selectedCategory: 'all',
    status: 'idle',
  });
}

describe('useProductsStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetProductsStore();
  });

  it('loads products successfully and stores the API payload', async () => {
    fetchProducts.mockResolvedValue(mockProducts);

    await act(async () => {
      await useProductsStore.getState().loadProducts();
    });

    const state = useProductsStore.getState();

    expect(fetchProducts).toHaveBeenCalledTimes(1);
    expect(state.status).toBe('success');
    expect(state.error).toBeNull();
    expect(state.products).toEqual(mockProducts);
    expect(state.lastUpdated).toEqual(expect.any(String));
  });

  it('keeps cached products available when refresh fails', async () => {
    useProductsStore.setState({
      lastUpdated: '2026-06-30T18:00:00.000Z',
      products: mockProducts,
      status: 'success',
    });
    fetchProducts.mockRejectedValue(new Error('Network error. Check your connection and try again.'));

    await act(async () => {
      await useProductsStore.getState().refreshProducts();
    });

    const state = useProductsStore.getState();

    expect(fetchProducts).toHaveBeenCalledTimes(1);
    expect(state.status).toBe('success');
    expect(state.products).toEqual(mockProducts);
    expect(state.error).toBe('Network error. Check your connection and try again.');
    expect(state.lastUpdated).toBe('2026-06-30T18:00:00.000Z');
  });
});
