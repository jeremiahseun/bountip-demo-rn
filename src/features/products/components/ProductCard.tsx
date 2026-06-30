import { Image, StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { colors, radius, spacing } from '@/theme/tokens';
import type { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image resizeMode="contain" source={{ uri: product.image }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <AppText style={styles.category} variant="eyebrow">
            {product.category}
          </AppText>
          <AppText color="accent" variant="subheading">
            {formatPrice(product.price)}
          </AppText>
        </View>

        <AppText numberOfLines={2} style={styles.title} variant="subheading">
          {product.title}
        </AppText>

        <AppText color="secondary" numberOfLines={3} variant="body">
          {product.description}
        </AppText>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  image: {
    height: 88,
    width: 88,
  },
  imageWrapper: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    height: 104,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 104,
  },
  content: {
    flex: 1,
    gap: spacing.sm,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  category: {
    flex: 1,
    textTransform: 'capitalize',
  },
  title: {
    flexShrink: 1,
  },
});
