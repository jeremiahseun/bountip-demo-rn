import { StyleSheet, View } from 'react-native';

import { SkeletonBlock } from '@/features/products/components/SkeletonBlock';
import { spacing } from '@/theme/tokens';

export function ProductDetailsLoadingState() {
  return (
    <View style={styles.content}>
      <SkeletonBlock height={280} />
      <View style={styles.copy}>
        <SkeletonBlock height={16} width="35%" />
        <SkeletonBlock height={40} width="85%" />
        <SkeletonBlock height={28} width="30%" />
        <SkeletonBlock height={16} />
        <SkeletonBlock height={16} width="96%" />
        <SkeletonBlock height={16} width="88%" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
  },
  copy: {
    gap: spacing.md,
  },
});
