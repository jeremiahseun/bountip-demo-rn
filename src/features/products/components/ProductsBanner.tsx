import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, radius, spacing } from '@/theme/tokens';

type ProductsBannerProps = {
  message: string;
};

export function ProductsBanner({ message }: ProductsBannerProps) {
  return (
    <View style={styles.banner}>
      <AppText color="danger" variant="label">
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FBE8E3',
    borderColor: '#E8B1A3',
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
