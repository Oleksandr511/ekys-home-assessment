import { useThemeStore } from "../store";
import { lightTheme, darkTheme } from "../tokens";

describe("Theme Store", () => {
  beforeEach(() => {
    useThemeStore.setState({
      theme: "light",
      tokens: lightTheme,
    });
  });

  test("setTheme updates theme and tokens correctly", async () => {
    const store = useThemeStore.getState();

    await store.setTheme("dark");

    const updatedStore = useThemeStore.getState();
    expect(updatedStore.theme).toBe("dark");
    expect(updatedStore.tokens).toEqual(darkTheme);
    expect(updatedStore.tokens.colors.background).toBe("#111827");
  });

  test("toggles between light and dark themes", async () => {
    const store = useThemeStore.getState();

    await store.setTheme("dark");
    expect(useThemeStore.getState().theme).toBe("dark");

    await store.setTheme("light");
    expect(useThemeStore.getState().theme).toBe("light");
    expect(useThemeStore.getState().tokens.colors.background).toBe("#FFFFFF");
  });

  test("light theme has correct tokens", () => {
    const store = useThemeStore.getState();
    expect(store.tokens.colors.primary).toBe("#2563EB");
    expect(store.tokens.spacing.md).toBe(16);
    expect(store.tokens.typography.fontSize.md).toBe(16);
  });

  test("dark theme has correct tokens", async () => {
    const store = useThemeStore.getState();
    await store.setTheme("dark");

    const darkStore = useThemeStore.getState();
    expect(darkStore.tokens.colors.primary).toBe("#3B82F6");
    expect(darkStore.tokens.colors.background).toBe("#111827");
  });
});
