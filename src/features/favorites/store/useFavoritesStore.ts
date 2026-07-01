import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FavoritesStoreState = {
  favoriteIds: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;
};

export const useFavoritesStore = create<FavoritesStoreState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      isFavorite: (productId) => get().favoriteIds.includes(productId),
      toggleFavorite: (productId) =>
        set((state) => {
          const isFavorite = state.favoriteIds.includes(productId);

          return {
            favoriteIds: isFavorite
              ? state.favoriteIds.filter((id) => id !== productId)
              : [...state.favoriteIds, productId],
          };
        }),
    }),
    {
      name: 'favorite-products',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
