import { fetch } from 'expo/fetch';

import { API_BASE_URL } from '@/services/api/config';
import type { Product } from '@/types/product';

class ProductApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ProductApiError';
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T;
  return payload;
}

async function requestProducts<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new ProductApiError('Network error. Check your connection and try again.', 0);
  }

  if (!response.ok) {
    throw new ProductApiError(`Request failed with status ${response.status}.`, response.status);
  }

  return parseJson<T>(response);
}

export async function fetchProducts(): Promise<Product[]> {
  return requestProducts<Product[]>('/products');
}

export async function fetchProductById(id: number): Promise<Product> {
  return requestProducts<Product>(`/products/${id}`);
}
