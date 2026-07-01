import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

import { useTheme } from '@/theme/useTheme';

export default function TabsLayout() {
  const { scheme } = useTheme();

  // NativeTabs delegates to the system-native UITabBarController on iOS, which
  // automatically renders with Liquid Glass on iOS 26+ and gracefully falls back
  // to the standard platform tab bar on older versions.
  //
  // We set blurEffect so that on pre-26 iOS the bar uses a native translucent
  // material (already looks glassy), matching the light/dark colour scheme.
  const blurEffect = Platform.OS === 'ios'
    ? (scheme === 'dark' ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight')
    : undefined;

  return (
    <NativeTabs blurEffect={blurEffect}>
      {/* SF Symbols are used for native-quality icons on iOS; they fall back
          automatically on Android where SF Symbols are unavailable. */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favorites">
        <NativeTabs.Trigger.Icon sf={{ default: 'heart', selected: 'heart.fill' }} />
        <NativeTabs.Trigger.Label>Favorites</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
