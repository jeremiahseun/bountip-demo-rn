export type ProductCategory = string;

export type Rating = {
  count?: number;
  rate?: number;
};

export type Product = {
  category: ProductCategory;
  description: string;
  id: number;
  image: string;
  price: number;
  rating?: Rating;
  title: string;
};

export type ProductsStatus = 'idle' | 'loading' | 'refreshing' | 'success' | 'error';
