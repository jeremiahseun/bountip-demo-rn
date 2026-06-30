import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { darkColors, lightColors, type Palette } from '@/theme/tokens';

export type ColorScheme = 'light' | 'dark';

export type Theme = {
  colors: Palette;
  scheme: ColorScheme;
};

/**
 * Primary theme hook. The colour scheme follows the device appearance setting
 * (`useColorScheme`), so dark mode is driven entirely by the phone's theme.
 */
export function useTheme(): Theme {
  const systemScheme = useColorScheme();
  const scheme: ColorScheme = systemScheme === 'dark' ? 'dark' : 'light';

  return useMemo(
    () => ({
      colors: scheme === 'dark' ? darkColors : lightColors,
      scheme,
    }),
    [scheme],
  );
}

/**
 * Builds StyleSheet objects from the active theme. The `factory` should be a
 * module-level constant so the memo stays stable across renders.
 */
export function useThemedStyles<T>(factory: (theme: Theme) => T): T {
  const theme = useTheme();
  return useMemo(() => factory(theme), [factory, theme]);
}
