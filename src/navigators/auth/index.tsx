import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../../features/theme/provider';
import { LoginScreen } from '../../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const { tokens } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: tokens.colors.background,
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
