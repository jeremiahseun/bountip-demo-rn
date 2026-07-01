const priceFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}
