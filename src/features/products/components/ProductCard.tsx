import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Icon } from '@/components/ui/Icon';
import { StarRating } from '@/components/ui/StarRating';
import { FavoriteButton } from '@/features/products/components/FavoriteButton';
import { formatPrice } from '@/features/products/utils/formatPrice';
import { radius, spacing } from '@/theme/tokens';
import { useTheme, useThemedStyles, type Theme } from '@/theme/useTheme';
import type { Product } from '@/types/product';

type ProductCardProps = {
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  product: Product;
};

export function ProductCard({ isFavorite, onPress, onToggleFavorite, product }: ProductCardProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <Animated.View entering={FadeIn.duration(220)}>
      <Pressable
        accessibilityHint="Opens the product details screen"
        accessibilityLabel={`${product.title}, ${formatPrice(product.price)}`}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <AppCard style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image
              accessibilityIgnoresInvertColors
              contentFit="contain"
              source={{ uri: product.image }}
              style={styles.image}
              transition={250}
            />
          </View>

          <View style={styles.content}>
            <View style={styles.header}>
              <AppText color="muted" numberOfLines={1} style={styles.category} variant="eyebrow">
                {product.category}
              </AppText>
              <FavoriteButton
                isFavorite={isFavorite}
                onPress={(event) => {
                  event?.stopPropagation?.();
                  onToggleFavorite();
                }}
                size="compact"
              />
            </View>

            <AppText numberOfLines={2} variant="subheading">
              {product.title}
            </AppText>

            {product.rating?.rate ? (
              <StarRating
                count={product.rating.count}
                rating={product.rating.rate}
                showValue
                size={14}
              />
            ) : null}

            <AppText color="secondary" numberOfLines={2} variant="body">
              {product.description}
            </AppText>

            <View style={styles.footer}>
              <AppText color="accent" variant="subheading">
                {formatPrice(product.price)}
              </AppText>
              <Icon color={colors.textMuted} name="chevron-forward" size={18} />
            </View>
          </View>
        </AppCard>
      </Pressable>
    </Animated.View>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      gap: spacing.md,
      padding: spacing.md,
    },
    image: {
      height: '100%',
      width: '100%',
    },
    imageWrapper: {
      alignItems: 'center',
      backgroundColor: colors.surfaceMuted,
      borderRadius: radius.lg,
      height: 108,
      justifyContent: 'center',
      overflow: 'hidden',
      padding: spacing.sm,
      width: 108,
    },
    content: {
      flex: 1,
      gap: spacing.xs,
      justifyContent: 'center',
    },
    footer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.xs,
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
    pressed: {
      opacity: 0.92,
    },
  });
