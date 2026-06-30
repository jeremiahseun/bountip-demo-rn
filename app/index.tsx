import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/layout/Screen';
import { colors, radius, spacing } from '@/theme/tokens';

export default function HomeScreen() {
  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="eyebrow">Batch 1 Foundation</AppText>
        <AppText variant="heading">Expo product catalogue shell</AppText>
        <AppText variant="body" color="secondary">
          The app shell, navigation, theme primitives, and TypeScript foundations are in place. The
          catalogue flow will land in the next batch.
        </AppText>
      </View>

      <AppCard>
        <AppText variant="subheading">Prepared for the next batch</AppText>
        <View style={styles.list}>
          <AppText variant="body">• Expo Router stack navigation</AppText>
          <AppText variant="body">• Zustand-ready feature folders</AppText>
          <AppText variant="body">• Reusable screen, card, button, and input primitives</AppText>
          <AppText variant="body">• Typed product models and API constants</AppText>
          <AppText variant="body">• Jest and React Native Testing Library wiring</AppText>
        </View>
      </AppCard>

      <AppButton accessibilityLabel="Foundation ready" label="Foundation ready" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    gap: spacing.md,
  },
  list: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.lg,
  },
});
