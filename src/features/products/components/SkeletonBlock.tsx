import { useEffect } from 'react';
import { type DimensionValue } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { radius } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

type SkeletonBlockProps = {
  height: number;
  radius?: number;
  width?: DimensionValue;
};

export function SkeletonBlock({
  height,
  radius: cornerRadius = radius.md,
  width = '100%',
}: SkeletonBlockProps) {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.55);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.82, { duration: 850, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.55, { duration: 850, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        { backgroundColor: colors.surfaceMuted },
        animatedStyle,
        {
          borderRadius: cornerRadius,
          height,
          width,
        },
      ]}
    />
  );
}
