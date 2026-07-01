import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Icon, type IconName } from '@/components/ui/Icon';
import { radius, spacing } from '@/theme/tokens';
import { useTheme, useThemedStyles, type Theme } from '@/theme/useTheme';

type ProductsEmptyStateProps = {
  onClearFilters: () => void;
  variant?: 'filters' | 'favorites';
};

const COPY: Record<NonNullable<ProductsEmptyStateProps['variant']>, {
  body: string;
  cta: string;
  icon: IconName;
  title: string;
}> = {
  filters: {
    body: 'Try another search term or reset the selected category to see the full catalogue again.',
    cta: 'Clear filters',
    icon: 'search-outline',
    title: 'No products match your filters',
  },
  favorites: {
    body: 'Tap the heart on any product to save it here for quick access later.',
    cta: 'Browse all products',
    icon: 'heart-outline',
    title: 'No favorites yet',
  },
};

export function ProductsEmptyState({ onClearFilters, variant = 'filters' }: ProductsEmptyStateProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const copy = COPY[variant];

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Icon color={colors.accent} name={copy.icon} size={28} />
      </View>
      <AppText style={styles.centered} variant="subheading">
        {copy.title}
      </AppText>
      <AppText color="secondary" style={styles.centered}>
        {copy.body}
      </AppText>
      <AppButton label={copy.cta} onPress={onClearFilters} variant="secondary" />
    </View>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xxl,
    },
    centered: {
      textAlign: 'center',
    },
    iconCircle: {
      alignItems: 'center',
      backgroundColor: colors.accentSoft,
      borderRadius: radius.full,
      height: 64,
      justifyContent: 'center',
      marginBottom: spacing.xs,
      width: 64,
    },
  });
