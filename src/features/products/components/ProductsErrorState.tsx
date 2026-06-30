import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { spacing } from '@/theme/tokens';

type ProductsErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ProductsErrorState({ message, onRetry }: ProductsErrorStateProps) {
  return (
    <AppCard>
      <View style={styles.content}>
        <AppText variant="subheading">Unable to load products</AppText>
        <AppText color="secondary">{message}</AppText>
        <AppButton label="Try again" onPress={onRetry} />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
});
