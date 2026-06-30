export const colors = {
  accent: '#CC5F3D',
  background: '#F6F2EA',
  border: '#E0D5C6',
  surface: '#FFFDF8',
  surfaceMuted: '#EFE6DA',
  textInverse: '#FFFDF8',
  textMuted: '#7E7468',
  textPrimary: '#231F1A',
  textSecondary: '#5A5046',
} as const;

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
  button: {
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 20,
  },
} as const;

export const shadow = {
  card: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
  },
} as const;
