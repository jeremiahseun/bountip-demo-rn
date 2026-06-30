import type { ProductCategory } from '@/types/product';

export const ALL_CATEGORY = 'all';

export type ProductFilterCategory = typeof ALL_CATEGORY | ProductCategory;
