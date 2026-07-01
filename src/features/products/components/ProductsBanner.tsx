import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Icon } from '@/components/ui/Icon';
import { radius, spacing } from '@/theme/tokens';
import { useTheme, useThemedStyles, type Theme } from '@/theme/useTheme';

type ProductsBannerProps = {
  message: string;
};

export function ProductsBanner({ message }: ProductsBannerProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <View accessibilityRole="alert" style={styles.banner}>
      <Icon color={colors.danger} name="alert-circle-outline" size={18} />
      <AppText color="danger" style={styles.message} variant="label">
        {message}
      </AppText>
    </View>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    banner: {
      alignItems: 'center',
      backgroundColor: colors.dangerSoft,
      borderColor: colors.dangerBorder,
      borderRadius: radius.md,
      borderWidth: 1,
      flexDirection: 'row',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    message: {
      flex: 1,
    },
  });
