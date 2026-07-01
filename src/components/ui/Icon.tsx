import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/theme/useTheme';

export type IconName = keyof typeof Ionicons.glyphMap;

type IconProps = {
  /** Optional explicit colour; defaults to the theme's secondary text colour. */
  color?: string;
  name: IconName;
  size?: number;
};

/**
 * Thin wrapper over Ionicons so the rest of the app has a single, themed icon
 * surface and never imports the vendor package directly.
 */
export function Icon({ color, name, size = 20 }: IconProps) {
  const { colors } = useTheme();
  return <Ionicons color={color ?? colors.textSecondary} name={name} size={size} />;
}
