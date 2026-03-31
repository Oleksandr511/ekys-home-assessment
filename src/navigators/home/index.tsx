import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../../features/theme/provider";
import { HomeScreen } from "../../screens/HomeScreen";
import { OnboardingScreen } from "../../screens/OnboardingScreen";
import { SettingsScreen } from "../../screens/SettingsScreen";

export type HomeNavigatorParamList = {
  Home: undefined;
  Onboarding: {
    step?: string;
  };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<HomeNavigatorParamList>();

export const HomeNavigator = () => {
  const { tokens } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: tokens.colors.surface,
        },
        headerTintColor: tokens.colors.text,
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "Home",
          headerLeft: () => null, // Prevent back button
        }}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          headerTitle: "KYC Onboarding",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
        }}
      />
    </Stack.Navigator>
  );
};
