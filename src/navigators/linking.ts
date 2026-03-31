import { LinkingOptions } from "@react-navigation/native";
import { extractStepFromUrl } from "./linkingUtils";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

export const linking: LinkingOptions<any> = {
  prefixes: [prefix, "myapp://"],
  config: {
    screens: {
      // Auth stack
      Login: "login",

      // Home stack
      Home: "home",
      Settings: "settings",
      Onboarding: {
        path: "onboarding/:step",
        parse: {
          step: (value: string) => {
            const normalized = value.toLowerCase();
            // Handle "review" alias for step 5
            if (normalized === "review") return "5";
            // Validate step is 1-5
            const stepNum = parseInt(normalized, 10);
            if (Number.isInteger(stepNum) && stepNum >= 1 && stepNum <= 5) {
              return String(stepNum);
            }
            // Default to home for invalid steps
            return undefined;
          },
        },
      },

      // Catch unmapped routes and default to Home
      NotFound: "*",
    },
  },

  // Handle linking to any screen
  async getInitialURL() {
    // First, check if we have an initial URL for the notification
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
  },

  // Subscribe to incoming links from deep linking
  subscribe(listener) {
    // Listen to incoming links from deep linking
    const onReceiveURL = ({ url }: { url: string }) => {
      listener(url);
    };

    const subscription = Linking.addEventListener("url", onReceiveURL);

    return () => {
      subscription.remove();
    };
  },
};

// Export utilities for use in RootNavigator
export { extractStepFromUrl };
