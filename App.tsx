import { ThemeProvider } from "./src/features/theme/provider";
import { RootNavigator } from "./src/navigators";

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}
