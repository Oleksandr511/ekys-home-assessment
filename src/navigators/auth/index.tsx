import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../../screens/LoginScreen";

export type AuthNavigatorParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

export const AuthNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
