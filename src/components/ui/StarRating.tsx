import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { spacing } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

type StarRatingProps = {
  /** Optional review count shown after the stars, e.g. "(120)". */
  count?: number;
  rating: number;
  /** Show the numeric rating value next to the stars. */
  showValue?: boolean;
  size?: number;
};

const MAX_STARS = 5;

/**
 * Renders a 5-star rating with support for half stars, plus an optional numeric
 * value and review count. Marked as an a11y "image" with a descriptive label.
 */
export function StarRating({ count, rating, showValue = false, size = 16 }: StarRatingProps) {
  const { colors } = useTheme();
  const clamped = Math.max(0, Math.min(MAX_STARS, rating));

  const countLabel = typeof count === 'number' ? `, ${count} reviews` : '';

  return (
    <View style={styles.row}>
      <View
        accessibilityLabel={`Rated ${clamped.toFixed(1)} out of 5${countLabel}`}
        accessibilityRole="image"
        style={styles.stars}
      >
        {Array.from({ length: MAX_STARS }).map((_, index) => {
          const position = index + 1;
          const name =
            clamped >= position ? 'star' : clamped >= position - 0.5 ? 'star-half' : 'star-outline';

          return <Ionicons color={colors.star} key={index} name={name} size={size} />;
        })}
      </View>

      {showValue ? (
        <AppText color="secondary" variant="label">
          {clamped.toFixed(1)}
          {typeof count === 'number' ? ` (${count})` : ''}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
});
