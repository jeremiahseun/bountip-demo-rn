import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/test/render';
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore';
import { ProductListScreen } from '@/features/products/screens/ProductListScreen';
import { useProductsStore } from '@/features/products/store/useProductsStore';
import type { Product } from '@/types/product';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@shopify/flash-list', () => {
  const React = require('react');
  const { FlatList } = require('react-native') as typeof import('react-native');
  const MockFlashList = React.forwardRef(function MockFlashList(props: any, ref: any) {
    return <FlatList ref={ref} {...props} />;
  });

  return {
    FlashList: MockFlashList,
  };
});

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
    category: "men's clothing",
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
    lastUpdated: '2026-06-30T18:00:00.000Z',
    products: mockProducts,
    searchQuery: '',
    selectedCategory: 'all',
    status: 'success',
  });
}

function resetFavoritesStore() {
  useFavoritesStore.setState({
    favoriteIds: [],
  });
}

describe('ProductListScreen', () => {
  beforeEach(() => {
    mockPush.mockReset();
    resetProductsStore();
    resetFavoritesStore();
  });

  it('renders catalogue data and navigates to product details when a card is pressed', () => {
    renderWithProviders(<ProductListScreen />);

    expect(screen.getByText('Studio Headphones')).toBeTruthy();
    expect(screen.getByText('Browse the latest products')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Studio Headphones, $199.99'));

    expect(mockPush).toHaveBeenCalledWith('/products/1');
  });

  it('shows an empty state when the search matches no products', () => {
    useProductsStore.setState({ searchQuery: 'nonexistent product' });

    renderWithProviders(<ProductListScreen />);

    expect(screen.getByText('No products match your filters')).toBeTruthy();
    expect(screen.queryByText('Studio Headphones')).toBeNull();
  });
});
