import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { darkColors, lightColors, type Palette } from '@/theme/tokens';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ColorScheme = 'light' | 'dark';

type ThemeStoreState = {
  hasHydrated: boolean;
  mode: ThemeMode;
  setHasHydrated: (hasHydrated: boolean) => void;
  setMode: (mode: ThemeMode) => void;
};

/**
 * Persists the user's explicit theme preference. `system` defers to the device
 * setting; `light`/`dark` are explicit overrides chosen from the UI.
 */
export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      mode: 'system',
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'theme-preference',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export type Theme = {
  colors: Palette;
  mode: ThemeMode;
  scheme: ColorScheme;
};

/** Resolves the effective colour scheme from the stored mode + device setting. */
export function useResolvedScheme(): ColorScheme {
  const systemScheme = useColorScheme();
  const mode = useThemeStore((state) => state.mode);

  if (mode === 'system') {
    return systemScheme === 'dark' ? 'dark' : 'light';
  }

  return mode;
}

/** Primary theme hook: returns the active palette plus the current mode. */
export function useTheme(): Theme {
  const scheme = useResolvedScheme();
  const mode = useThemeStore((state) => state.mode);

  return useMemo(
    () => ({
      colors: scheme === 'dark' ? darkColors : lightColors,
      mode,
      scheme,
    }),
    [mode, scheme],
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
