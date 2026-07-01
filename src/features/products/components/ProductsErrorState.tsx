import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppText } from '@/components/ui/AppText';
import { Icon } from '@/components/ui/Icon';
import { radius, spacing } from '@/theme/tokens';
import { useTheme, useThemedStyles, type Theme } from '@/theme/useTheme';

type ProductsErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ProductsErrorState({ message, onRetry }: ProductsErrorStateProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <AppCard>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Icon color={colors.danger} name="cloud-offline-outline" size={28} />
        </View>
        <AppText style={styles.centered} variant="subheading">
          Something went wrong
        </AppText>
        <AppText color="secondary" style={styles.centered}>
          {message}
        </AppText>
        <AppButton icon="refresh" label="Try again" onPress={onRetry} />
      </View>
    </AppCard>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    content: {
      alignItems: 'center',
      gap: spacing.md,
    },
    centered: {
      textAlign: 'center',
    },
    iconCircle: {
      alignItems: 'center',
      backgroundColor: colors.dangerSoft,
      borderRadius: radius.full,
      height: 64,
      justifyContent: 'center',
      width: 64,
    },
  });
