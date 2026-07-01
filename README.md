# Bountip Demo RN

## Overview

This is an Expo-managed React Native product catalogue app built for the Bountip React Native technical assessment. It fetches products from [`https://fakestoreapi.com/products`](https://fakestoreapi.com/products), supports debounced search and category filtering, shows product details with ratings, and persists lightweight client state with Zustand. Navigation is organised into **Home** and **Favorites** bottom tabs.

## Features

- **Home / Favorites bottom tabs** (Expo Router)
- Product catalogue powered by `FlashList`
- Product details screen with fallback fetch by product ID
- Debounced title search with an inline clear button
- Category filtering via horizontal chips
- **Favorites tab** with its own empty state, backed by persisted favorites
- Star ratings on cards and the details screen
- **Infinite scroll** — the list reveals products in pages with a visible loading footer
- Initial loading, retry, pull-to-refresh, empty-results, and inline error states
- **Dark mode** that follows the device appearance setting (`userInterfaceStyle: automatic`)
- **Liquid Glass tab bar** on iOS 26+ (`expo-glass-effect`) plus a translucent, content-scrolls-under details header, each with a graceful solid fallback elsewhere
- Persisted offline-friendly catalogue cache of the last successful fetch
- Cached, fade-in product images via `expo-image`
- Skeleton loaders, icon set, and small Reanimated polish (animated favorite heart, card/detail entrances)
- TypeScript, Expo Router, and Zustand-based architecture

## Tech Stack

- Expo SDK 57
- React Native 0.86
- TypeScript
- Expo Router
- Zustand
- `@shopify/flash-list`
- `expo-image`
- `expo-glass-effect` (iOS Liquid Glass)
- `@expo/vector-icons` (Ionicons)
- React Native Reanimated
- Jest + React Native Testing Library

## Installation

### Prerequisites

- Node.js 20+ recommended
- npm
- Xcode / iOS Simulator for iOS development
- Android Studio / Android Emulator for Android development

### Setup

```bash
npm install
```

## Running the App

### Start the Expo dev server

```bash
npm run start
```

### Run on iOS

```bash
npm run ios
```

### Run on Android

```bash
npm run android
```

## Running Tests

### Execute the Jest suite

```bash
npm test
```

The suite covers the store's load/refresh + cache-fallback behaviour, the search/category filtering logic, the Home screen (render, navigation on card press, empty search results), and the Favorites screen (favorites intersection + empty state).

### Run the typecheck

```bash
npm run typecheck
```

## Architecture

The app uses a feature-first structure under `src/features`, with UI primitives in `src/components`, shared tokens in `src/theme`, and lightweight services in `src/services`.

### State management decisions

- `useProductsStore` owns shared catalogue state, fetch status, persisted cached products, and committed filters (search query, category).
- Search input draft state stays local to the list screen and only commits to the store after a `300ms` debounce.
- `useFavoritesStore` is separate because favorites are durable client preferences and do not need to mix with fetch lifecycle state. The Favorites tab derives its list by intersecting the catalogue with the persisted favorite IDs.
- Both tabs share a `useEnsureProductsLoaded` hook so the catalogue loads regardless of which tab opens first, and a `ProductsList` component that owns the infinite-scroll paging.

Zustand was chosen because the app has modest shared state needs: one main remote resource, a few persisted client preferences, and simple cross-screen coordination. It keeps the data flow explicit without the extra ceremony of Redux or an additional server-state library.

### Theming / UI decisions

- Dark mode follows the device appearance via `useColorScheme()` (no in-app toggle), with `userInterfaceStyle: automatic` in `app.json`.
- All components style themselves from a semantic palette (`src/theme/tokens.ts`) via `useThemedStyles`, so light and dark schemes are defined once and applied at runtime.
- Reusable primitives live in `src/components/ui` (`AppText`, `AppButton`, `AppInput`, `AppCard`, `Icon`, `StarRating`) and feature-specific UI lives under `src/features/products/components`.
- `formatPrice` is shared in `src/features/products/utils` rather than duplicated per screen.

### Data fetching decisions

- Catalogue fetches use `expo/fetch`.
- The list screen fetches `/products`.
- The details screen first resolves from the in-memory/persisted catalogue, then falls back to `/products/:id` when needed.
- The last successful catalogue snapshot is persisted for lightweight offline fallback behavior.

## Screenshots

Add screenshots or a short screen recording here before submission.

- `screenshots/catalogue.png`
- `screenshots/details.png`
- Optional recording: `screenshots/bountip-demo.mov`

## Assumptions

- The submission targets iOS and Android only.
- “Offline caching” means reusing the last successful catalogue snapshot, not full offline sync.
- Fake Store API is treated as stable enough for the exercise, with basic retry/error handling rather than advanced resiliency tooling.
- Product categories are derived from the fetched payload instead of being hard-coded.

## Known Limitations

- The Fake Store API returns the full (small) catalogue in one request, so the infinite scroll pages through the already-fetched payload client-side rather than making paged network requests.
- Favorites are persisted locally only and do not sync across devices.
- Dark mode follows the system appearance; there is no in-app override by design.
- Liquid Glass renders fully on iOS 26+. The details header uses a translucent blur material that already looks glassy on earlier iOS; the tab bar falls back to a solid themed bar on pre-26 iOS, Android, and web.
