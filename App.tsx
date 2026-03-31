import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/features/theme/provider';
import { RootNavigator } from './src/navigators';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
