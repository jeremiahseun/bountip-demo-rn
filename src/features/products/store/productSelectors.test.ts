import { filterProducts, normalizeSearchQuery } from '@/features/products/store/productSelectors';
import { ALL_CATEGORY } from '@/features/products/constants';
import type { Product } from '@/types/product';

const products: Product[] = [
  {
    category: 'electronics',
    description: 'Noise cancelling over-ear headphones.',
    id: 1,
    image: 'https://example.com/headphones.png',
    price: 199.99,
    rating: { count: 12, rate: 4.8 },
    title: 'Studio Headphones',
  },
  {
    category: 'electronics',
    description: 'A fast portable solid state drive.',
    id: 2,
    image: 'https://example.com/ssd.png',
    price: 109,
    rating: { count: 30, rate: 4.5 },
    title: 'Portable SSD',
  },
  {
    category: "men's clothing",
    description: 'A relaxed fit jacket for cool weather.',
    id: 3,
    image: 'https://example.com/jacket.png',
    price: 89.5,
    rating: { count: 5, rate: 4.2 },
    title: 'Weekend Jacket',
  },
];

describe('filterProducts', () => {
  it('returns every product when no filters are applied', () => {
    expect(filterProducts(products, '', ALL_CATEGORY)).toHaveLength(3);
  });

  it('matches titles case-insensitively and ignores surrounding whitespace', () => {
    const result = filterProducts(products, '  headphones ', ALL_CATEGORY);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Studio Headphones');
  });

  it('filters by the selected category', () => {
    const result = filterProducts(products, '', 'electronics');

    expect(result.map((product) => product.id)).toEqual([1, 2]);
  });

  it('combines search and category filters', () => {
    const result = filterProducts(products, 'ssd', 'electronics');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('returns an empty list when nothing matches the search', () => {
    expect(filterProducts(products, 'nonexistent', ALL_CATEGORY)).toHaveLength(0);
  });

  it('normalizes queries for comparison', () => {
    expect(normalizeSearchQuery('  Hello World ')).toBe('hello world');
  });
});
