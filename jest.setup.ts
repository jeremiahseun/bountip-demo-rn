import 'react-native-gesture-handler/jestSetup';
import React from 'react';

jest.mock('react-native-reanimated', () => {
  const React = require('react');
  const { View } = require('react-native');

  const mock = {
    View,
    createAnimatedComponent: (Component: React.ComponentType<any>) => Component,
    Easing: {
      ease: 'ease',
      inOut: (value: unknown) => value,
    },
    FadeIn: {
      duration: () => ({}),
    },
    FadeInDown: {
      duration: () => ({}),
    },
    useAnimatedStyle: (updater: () => Record<string, unknown>) => updater(),
    useSharedValue: <T>(value: T) => ({ value }),
    withRepeat: <T>(value: T) => value,
    withSequence: <T>(...values: T[]) => values[values.length - 1],
    withSpring: <T>(value: T) => value,
    withTiming: <T>(value: T) => value,
  };

  return {
    __esModule: true,
    ...mock,
    default: mock,
  };
});

jest.mock('expo-image', () => {
  const { Image } = require('react-native');
  return { Image };
});

jest.mock('expo-glass-effect', () => {
  const { View } = require('react-native');
  return {
    GlassView: View,
    GlassContainer: View,
    isLiquidGlassAvailable: () => false,
    isGlassEffectAPIAvailable: () => false,
  };
});

jest.mock('expo-router/unstable-native-tabs', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  function TriggerLabel({ children }: { children?: string }) {
    return React.createElement(Text, null, children);
  }
  function TriggerIcon() {
    return null;
  }
  function TriggerBadge() {
    return null;
  }
  function Trigger({ children }: { children?: React.ReactNode }) {
    return React.createElement(View, null, children);
  }
  Trigger.Label = TriggerLabel;
  Trigger.Icon = TriggerIcon;
  Trigger.Badge = TriggerBadge;

  function NativeTabs({ children }: { children?: React.ReactNode }) {
    return React.createElement(View, null, children);
  }
  NativeTabs.Trigger = Trigger;

  return { NativeTabs };
});

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const Ionicons = ({ name, ...props }: { name?: string }) =>
    React.createElement(Text, props, name);
  Ionicons.glyphMap = {};

  return { Ionicons };
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    SafeAreaView: ({ children, ...props }: { children: React.ReactNode }) =>
      React.createElement(View, props, children),
    useSafeAreaInsets: () => ({
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    }),
  };
});
