import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { colors, spacing } from '@/theme/tokens';

export function ProductsLoadingState() {
  return (
    <AppCard>
      <View style={styles.content}>
        <ActivityIndicator color={colors.accent} size="large" />
        <AppText variant="subheading">Loading catalogue</AppText>
        <AppText color="secondary">
          Fetching the latest products from the API and preparing your catalogue.
        </AppText>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xxl,
  },
});
