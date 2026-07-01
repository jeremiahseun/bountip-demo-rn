import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/layout/Screen';
import { StarRating } from '@/components/ui/StarRating';
import { ProductDetailsLoadingState } from '@/features/products/components/ProductDetailsLoadingState';
import { ProductsErrorState } from '@/features/products/components/ProductsErrorState';
import { formatPrice } from '@/features/products/utils/formatPrice';
import { selectProductById, selectProductsHydrated } from '@/features/products/store/productSelectors';
import { useProductsStore } from '@/features/products/store/useProductsStore';
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore';
import { radius, spacing } from '@/theme/tokens';
import { useTheme, useThemedStyles, type Theme } from '@/theme/useTheme';
import type { Product } from '@/types/product';

export function ProductDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const styles = useThemedStyles(makeStyles);
  const insets = useSafeAreaInsets();
  const { scheme } = useTheme();
  const productId = Number(params.id);
  const hasValidProductId = Number.isFinite(productId);

  // A translucent (Liquid Glass on iOS 26) header that content scrolls beneath.
  const isIOS = Platform.OS === 'ios';
  const blurEffect: 'systemChromeMaterialDark' | 'systemChromeMaterialLight' =
    scheme === 'dark' ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight';
  const headerOptions = {
    title: 'Product details',
    headerTransparent: isIOS,
    headerBlurEffect: isIOS ? blurEffect : undefined,
  };
  // When the header floats (iOS), pad content past the status bar + nav bar.
  const contentStyle = [
    styles.screenContent,
    { paddingTop: (isIOS ? insets.top + 44 : 0) + spacing.lg },
  ];

  const hasHydrated = useProductsStore(selectProductsHydrated);
  const storeProduct = useProductsStore(
    hasValidProductId ? selectProductById(productId) : () => undefined,
  );
  const resolveProductById = useProductsStore((state) => state.resolveProductById);
  const isFavorite = useFavoritesStore((state) =>
    hasValidProductId ? state.favoriteIds.includes(productId) : false,
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const [resolvedProduct, setResolvedProduct] = useState<Product | null>(storeProduct ?? null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    storeProduct ? 'success' : 'loading',
  );
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!hasValidProductId) {
      setError('The selected product could not be identified.');
      setStatus('error');
      return;
    }

    if (storeProduct) {
      setResolvedProduct(storeProduct);
      setError(null);
      setStatus('success');
      return;
    }

    if (!hasHydrated) {
      return;
    }

    let active = true;

    async function loadProduct() {
      setStatus('loading');
      setError(null);

      try {
        const product = await resolveProductById(productId);

        if (!active) {
          return;
        }

        setResolvedProduct(product);
        setStatus('success');
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : 'Unable to load product details.');
        setStatus('error');
      }
    }

    void loadProduct();

    return () => {
      active = false;
    };
  }, [hasHydrated, hasValidProductId, productId, resolveProductById, retryCount, storeProduct]);

  if (status === 'loading') {
    return (
      <Screen contentContainerStyle={contentStyle} edges={[]}>
        <Stack.Screen options={headerOptions} />
        <ProductDetailsLoadingState />
      </Screen>
    );
  }

  if (status === 'error' || !resolvedProduct) {
    return (
      <Screen contentContainerStyle={contentStyle} edges={[]}>
        <Stack.Screen options={headerOptions} />
        <ProductsErrorState
          message={error ?? 'Unable to load product details.'}
          onRetry={() => {
            setResolvedProduct(null);
            setStatus('loading');
            setError(null);
            setRetryCount((count) => count + 1);
          }}
        />
      </Screen>
    );
  }

  return (
    <Screen contentContainerStyle={styles.screenContent} edges={[]}>
      <Stack.Screen options={{ title: 'Product details' }} />
      <Animated.View entering={FadeInDown.duration(280)} style={styles.content}>
        <AppCard style={styles.heroCard}>
          <Image
            accessibilityIgnoresInvertColors
            accessibilityLabel={`${resolvedProduct.title} product image`}
            contentFit="contain"
            source={{ uri: resolvedProduct.image }}
            style={styles.image}
            transition={300}
          />
        </AppCard>

        <View style={styles.copy}>
          <View style={styles.categoryPill}>
            <AppText color="accent" variant="eyebrow">
              {resolvedProduct.category}
            </AppText>
          </View>

          <AppText variant="heading">{resolvedProduct.title}</AppText>

          <View style={styles.statsRow}>
            <AppText color="accent" style={styles.price}>
              {formatPrice(resolvedProduct.price)}
            </AppText>
            {resolvedProduct.rating?.rate ? (
              <StarRating
                count={resolvedProduct.rating.count}
                rating={resolvedProduct.rating.rate}
                showValue
                size={18}
              />
            ) : null}
          </View>

          <View style={styles.divider} />

          <AppText color="secondary" variant="label">
            Description
          </AppText>
          <AppText color="secondary">{resolvedProduct.description}</AppText>
        </View>

        <AppButton
          accessibilityLabel={
            isFavorite ? 'Remove this product from favorites' : 'Save this product to favorites'
          }
          icon={isFavorite ? 'heart' : 'heart-outline'}
          label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          onPress={() => toggleFavorite(resolvedProduct.id)}
          variant={isFavorite ? 'secondary' : 'primary'}
        />
      </Animated.View>
    </Screen>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    content: {
      gap: spacing.xl,
    },
    copy: {
      gap: spacing.md,
    },
    categoryPill: {
      alignSelf: 'flex-start',
      backgroundColor: colors.accentSoft,
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    divider: {
      backgroundColor: colors.border,
      height: StyleSheet.hairlineWidth,
      marginVertical: spacing.xs,
    },
    heroCard: {
      alignItems: 'center',
      backgroundColor: colors.surface,
      justifyContent: 'center',
      padding: spacing.xl,
    },
    image: {
      height: 260,
      width: '100%',
    },
    price: {
      fontSize: 26,
      fontWeight: '700',
      letterSpacing: -0.4,
      lineHeight: 32,
    },
    screenContent: {
      gap: spacing.xl,
      paddingBottom: spacing.xxxl,
    },
    statsRow: {
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
      justifyContent: 'space-between',
    },
  });
