import type { ViewStyle } from 'react-native';

/**
 * Semantic colour palette. The same keys exist for light and dark schemes so
 * components can be written once and themed at runtime via `useTheme`.
 */
export type Palette = {
  accent: string;
  accentSoft: string;
  background: string;
  border: string;
  danger: string;
  dangerSoft: string;
  dangerBorder: string;
  onAccent: string;
  star: string;
  surface: string;
  surfaceMuted: string;
  textInverse: string;
  textMuted: string;
  textPrimary: string;
  textSecondary: string;
  shadowColor: string;
  shadowOpacity: number;
  elevation: number;
};

export const lightColors: Palette = {
  accent: '#CC5F3D',
  accentSoft: '#F6E3DA',
  background: '#F6F2EA',
  border: '#E0D5C6',
  danger: '#B3432F',
  dangerSoft: '#FBE8E3',
  dangerBorder: '#E8B1A3',
  onAccent: '#FFFDF8',
  star: '#DC9A33',
  surface: '#FFFDF8',
  surfaceMuted: '#EFE6DA',
  textInverse: '#FFFDF8',
  textMuted: '#7E7468',
  textPrimary: '#231F1A',
  textSecondary: '#5A5046',
  shadowColor: '#2A1D10',
  shadowOpacity: 0.1,
  elevation: 2,
};

export const darkColors: Palette = {
  accent: '#E0714A',
  accentSoft: '#3A2A22',
  background: '#16120E',
  border: '#39322A',
  danger: '#E5765F',
  dangerSoft: '#3A211B',
  dangerBorder: '#5C3328',
  onAccent: '#1B130E',
  star: '#F0B450',
  surface: '#211C16',
  surfaceMuted: '#2C261F',
  textInverse: '#16120E',
  textMuted: '#988C7C',
  textPrimary: '#F4EEE4',
  textSecondary: '#C8BEB0',
  shadowColor: '#000000',
  shadowOpacity: 0.45,
  elevation: 0,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const typography = {
  eyebrow: {
    fontSize: 12,
    fontWeight: '700' as const,
    letterSpacing: 1.2,
    lineHeight: 16,
    textTransform: 'uppercase' as const,
  },
  heading: {
    fontSize: 30,
    fontWeight: '700' as const,
    letterSpacing: -0.6,
    lineHeight: 36,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 20,
  },
} as const;

/** Builds a theme-aware card shadow so elevation reads well in both schemes. */
export function makeCardShadow(palette: Palette): ViewStyle {
  return {
    elevation: palette.elevation,
    shadowColor: palette.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: palette.shadowOpacity,
    shadowRadius: 14,
  };
}
