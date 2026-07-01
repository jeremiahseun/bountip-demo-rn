import { StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { SkeletonBlock } from '@/features/products/components/SkeletonBlock';
import { spacing } from '@/theme/tokens';

export function ProductsLoadingState() {
  return (
    <View style={styles.content}>
      <SkeletonBlock height={44} width="34%" />
      <SkeletonBlock height={40} width="78%" />
      <SkeletonBlock height={52} />
      <View style={styles.chips}>
        <SkeletonBlock height={36} radius={999} width={82} />
        <SkeletonBlock height={36} radius={999} width={106} />
        <SkeletonBlock height={36} radius={999} width={92} />
      </View>

      {[0, 1, 2].map((item) => (
        <AppCard key={item} style={styles.card}>
          <SkeletonBlock height={104} width={104} />
          <View style={styles.cardCopy}>
            <SkeletonBlock height={14} width="45%" />
            <SkeletonBlock height={22} width="82%" />
            <SkeletonBlock height={16} />
            <SkeletonBlock height={16} width="92%" />
          </View>
        </AppCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  cardCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  content: {
    gap: spacing.lg,
  },
});
