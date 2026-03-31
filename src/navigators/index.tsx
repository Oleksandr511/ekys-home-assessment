import React, { useEffect, useRef } from "react";
import { ActivityIndicator, View, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import type { NavigationContainerRef } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useAuthStore } from "../features/auth/store";
import { useOnboardingStore } from "../features/onboarding/store";
import { useTheme } from "../features/theme/provider";
import { useAuthGuard } from "../features/auth/useAuthGuard";
import { AuthNavigator } from "./auth";
import { HomeNavigator, type HomeNavigatorParamList } from "./home";
import { linking, extractStepFromUrl } from "./linking";
import type { OnboardingStep } from "../features/onboarding/types";

export const RootNavigator = () => {
  const status = useAuthStore((state) => state.status);
  const pendingDeepLinkStep = useAuthStore(
    (state) => state.pendingDeepLinkStep,
  );
  const setPendingDeepLinkStep = useAuthStore(
    (state) => state.setPendingDeepLinkStep,
  );
  const clearPendingDeepLinkStep = useAuthStore(
    (state) => state.clearPendingDeepLinkStep,
  );
  const { tokens } = useTheme();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const navigationRef = useRef<NavigationContainerRef<HomeNavigatorParamList> | null>(null);

  // Use auth guard to check token expiry
  useAuthGuard();

  useEffect(() => {
    // Show alert if session expired
    if (status === "expired") {
      Alert.alert(
        "Session Expired",
        "Your session has expired. Please login again.",
        [{ text: "OK" }],
      );
    }
  }, [status]);

  // Listen for deep links and handle auth flow
  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL();
      if (url && status === "logged_out") {
        const step = extractStepFromUrl(url);
        if (step) {
          setPendingDeepLinkStep(step);
        }
      }
    };

    handleDeepLink();

    // Subscribe to incoming deep links while app is running
    const subscription = Linking.addEventListener(
      "url",
      ({ url }: { url: string }) => {
        if (status === "logged_out") {
          const step = extractStepFromUrl(url);
          if (step) {
            setPendingDeepLinkStep(step);
          }
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [status, setPendingDeepLinkStep]);

  // Handle pending deep link step after successful login
  useEffect(() => {
    if (status === "logged_in" && pendingDeepLinkStep) {
      const timer = setTimeout(() => {
        useOnboardingStore.setState({
          currentStep: pendingDeepLinkStep as OnboardingStep,
        });
        navigationRef.current?.navigate("Onboarding", {
          step: String(pendingDeepLinkStep),
        });
        clearPendingDeepLinkStep();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [status, pendingDeepLinkStep, clearPendingDeepLinkStep]);

  useEffect(() => {
    // Mark as hydrated after first render
    const timer = setTimeout(() => setIsHydrated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: tokens.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={tokens.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      fallback={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: tokens.colors.background,
          }}
        >
          <ActivityIndicator size="large" color={tokens.colors.primary} />
        </View>
      }
    >
      {status === "logged_in" ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
