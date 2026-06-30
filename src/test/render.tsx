import type { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function renderWithProviders(ui: ReactElement) {
  function Wrapper({ children }: PropsWithChildren) {
    return <SafeAreaProvider>{children}</SafeAreaProvider>;
  }

  return render(ui, { wrapper: Wrapper });
}
