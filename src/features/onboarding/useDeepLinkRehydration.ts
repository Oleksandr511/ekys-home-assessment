import { useEffect } from "react";
import { useOnboardingStore } from "./store";
import { OnboardingStep } from "./types";

/**
 * Hook to apply pending deep link step changes to the onboarding state.
 * This handles setting the current step when a deep link navigates to onboarding.
 *
 * @param step - The step number to navigate to (1-5), or undefined if not from a deep link
 * @param onConsumed - Optional callback that runs after a valid step is consumed
 */
export const useDeepLinkRehydration = (
  step?: string,
  onConsumed?: () => void,
) => {
  useEffect(() => {
    if (!step) return;

    // Parse step and validate
    const stepNum = parseInt(step, 10);
    if (!Number.isInteger(stepNum) || stepNum < 1 || stepNum > 5) return;

    // Apply the step to the onboarding store
    // The store will already be hydrated from AsyncStorage by the time this runs
    useOnboardingStore.setState({
      currentStep: stepNum as OnboardingStep,
    });

    // Clear the route param once consumed to avoid re-applying on remount.
    onConsumed?.();
  }, [step, onConsumed]);
};
