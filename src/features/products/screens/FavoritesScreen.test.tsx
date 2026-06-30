import { screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/test/render';
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore';
import { FavoritesScreen } from '@/features/products/screens/FavoritesScreen';
import { useProductsStore } from '@/features/products/store/useProductsStore';
import type { Product } from '@/types/product';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: jest.fn(),
    push: jest.fn(),
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

function setProducts() {
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

describe('FavoritesScreen', () => {
  it('shows only the products that have been favorited', () => {
    setProducts();
    useFavoritesStore.setState({ favoriteIds: [2] });

    renderWithProviders(<FavoritesScreen />);

    expect(screen.getByText('Weekend Jacket')).toBeTruthy();
    expect(screen.queryByText('Studio Headphones')).toBeNull();
  });

  it('shows an empty state when there are no favorites', () => {
    setProducts();
    useFavoritesStore.setState({ favoriteIds: [] });

    renderWithProviders(<FavoritesScreen />);

    expect(screen.getByText('No favorites yet')).toBeTruthy();
  });
});
