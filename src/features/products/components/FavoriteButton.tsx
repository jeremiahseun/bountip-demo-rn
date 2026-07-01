import { Ionicons } from '@expo/vector-icons';
import type { GestureResponderEvent } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { radius, spacing } from '@/theme/tokens';
import { useTheme, useThemedStyles, type Theme } from '@/theme/useTheme';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onPress: (event: GestureResponderEvent) => void;
  size?: 'default' | 'compact';
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function FavoriteButton({ isFavorite, onPress, size = 'default' }: FavoriteButtonProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconSize = size === 'compact' ? 18 : 22;

  return (
    <AnimatedPressable
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      accessibilityRole="button"
      accessibilityState={{ selected: isFavorite }}
      hitSlop={8}
      onPress={(event) => {
        // A quick pop on every tap makes the toggle feel responsive.
        scale.value = withSequence(
          withSpring(0.85, { damping: 12, stiffness: 320 }),
          withSpring(1, { damping: 10, stiffness: 220 }),
        );
        onPress(event);
      }}
      style={[
        styles.button,
        size === 'compact' ? styles.compactButton : styles.defaultButton,
        isFavorite && styles.activeButton,
        animatedStyle,
      ]}
    >
      <Ionicons
        color={isFavorite ? colors.onAccent : colors.textSecondary}
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={iconSize}
      />
    </AnimatedPressable>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.full,
      borderWidth: 1,
      justifyContent: 'center',
    },
    activeButton: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    compactButton: {
      height: 36,
      width: 36,
    },
    defaultButton: {
      height: 44,
      paddingHorizontal: spacing.md,
      width: 44,
    },
  });
