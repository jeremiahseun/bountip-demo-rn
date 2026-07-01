import type { PropsWithChildren } from 'react';
import type { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { spacing } from '@/theme/tokens';
import { useThemedStyles, type Theme } from '@/theme/useTheme';

type ScreenProps = PropsWithChildren<{
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Safe-area edges to inset. Pass `[]` when a native header already covers the top. */
  edges?: readonly Edge[];
}> &
  Omit<ScrollViewProps, 'contentContainerStyle'>;

export function Screen({
  children,
  contentContainerStyle,
  edges = ['top'],
  ...scrollViewProps
}: ScreenProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <SafeAreaView edges={edges} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: colors.background,
      flex: 1,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
    },
  });
