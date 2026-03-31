import React, { useEffect, useState } from "react";
import { useThemeStore } from "./store";

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const tokens = useThemeStore((state) => state.tokens);
  const setTheme = useThemeStore((state) => state.setTheme);

  return { theme, tokens, setTheme };
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated after first render to ensure AsyncStorage is loaded
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
};
