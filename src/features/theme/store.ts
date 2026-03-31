import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeState } from './types';
import { lightTheme, darkTheme, ThemeTokens } from './tokens';

interface ThemeStore extends ThemeState {
  tokens: ThemeTokens;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      tokens: lightTheme,
      setTheme: async (theme: Theme) => {
        set({
          theme,
          tokens: theme === 'light' ? lightTheme : darkTheme,
        });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
