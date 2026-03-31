import { useOnboardingStore } from "../store";
import { EMPTY_DRAFT } from "../types";

describe("Onboarding Store", () => {
  beforeEach(() => {
    useOnboardingStore.setState({
      draft: EMPTY_DRAFT,
      currentStep: 1,
      submissionStatus: "idle",
      submissionError: null,
    });
  });

  describe("Draft updates", () => {
    test("updateDraftField updates profile fields", () => {
      const store = useOnboardingStore.getState();
      store.updateDraftField(1, "fullName", "John Doe");

      const updated = useOnboardingStore.getState();
      expect(updated.draft.profile.fullName).toBe("John Doe");
      expect(updated.draft.profile.dateOfBirth).toBe("");
    });

    test("updateDraftField updates document fields", () => {
      const store = useOnboardingStore.getState();
      store.updateDraftField(2, "documentType", "PASSPORT");
      store.updateDraftField(2, "documentNumber", "P123456");

      const updated = useOnboardingStore.getState();
      expect(updated.draft.document.documentType).toBe("PASSPORT");
      expect(updated.draft.document.documentNumber).toBe("P123456");
    });

    test("updateDraftField handles selfie flag", () => {
      const store = useOnboardingStore.getState();
      store.updateDraftField(3, "hasSelfie", true);

      const updated = useOnboardingStore.getState();
      expect(updated.draft.selfie.hasSelfie).toBe(true);
    });

    test("updateDraftField updates address fields", () => {
      const store = useOnboardingStore.getState();
      store.updateDraftField(4, "addressLine1", "123 Main St");
      store.updateDraftField(4, "city", "New York");
      store.updateDraftField(4, "country", "US");

      const updated = useOnboardingStore.getState();
      expect(updated.draft.address.addressLine1).toBe("123 Main St");
      expect(updated.draft.address.city).toBe("New York");
      expect(updated.draft.address.country).toBe("US");
    });

    test("updateDraftField updates consent fields", () => {
      const store = useOnboardingStore.getState();
      store.updateDraftField(5, "termsAccepted", true);

      const updated = useOnboardingStore.getState();
      expect(updated.draft.consents.termsAccepted).toBe(true);
    });
  });

  describe("Step navigation", () => {
    test("nextStep increments current step", () => {
      let store = useOnboardingStore.getState();
      expect(store.currentStep).toBe(1);

      store.nextStep();
      store = useOnboardingStore.getState();
      expect(store.currentStep).toBe(2);

      store.nextStep();
      store = useOnboardingStore.getState();
      expect(store.currentStep).toBe(3);
    });

    test("nextStep does not go beyond step 5", () => {
      const store = useOnboardingStore.getState();
      useOnboardingStore.setState({ currentStep: 5 });

      store.nextStep();
      const updated = useOnboardingStore.getState();
      expect(updated.currentStep).toBe(5);
    });

    test("prevStep decrements current step", () => {
      useOnboardingStore.setState({ currentStep: 3 });
      let store = useOnboardingStore.getState();
      expect(store.currentStep).toBe(3);

      store.prevStep();
      store = useOnboardingStore.getState();
      expect(store.currentStep).toBe(2);
    });

    test("prevStep does not go below step 1", () => {
      const store = useOnboardingStore.getState();
      expect(store.currentStep).toBe(1);

      store.prevStep();
      const updated = useOnboardingStore.getState();
      expect(updated.currentStep).toBe(1);
    });
  });

  describe("Status tracking", () => {
    test("getOnboardingStatus returns not_started for empty draft", () => {
      const store = useOnboardingStore.getState();
      expect(store.getOnboardingStatus()).toBe("not_started");
    });

    test("getOnboardingStatus returns in_progress when draft has data", () => {
      const store = useOnboardingStore.getState();
      store.updateDraftField(1, "fullName", "John Doe");

      const updated = useOnboardingStore.getState();
      expect(updated.getOnboardingStatus()).toBe("in_progress");
    });

    test("getOnboardingStatus considers multiple fields", () => {
      const store = useOnboardingStore.getState();
      store.updateDraftField(1, "fullName", "John Doe");
      store.updateDraftField(2, "documentType", "PASSPORT");

      const updated = useOnboardingStore.getState();
      expect(updated.getOnboardingStatus()).toBe("in_progress");
    });
  });

  describe("Draft reset", () => {
    test("resetDraft clears all data and resets step", () => {
      const store = useOnboardingStore.getState();
      store.updateDraftField(1, "fullName", "John Doe");
      store.updateDraftField(2, "documentType", "PASSPORT");
      store.nextStep();
      store.nextStep();

      store.resetDraft();

      const reset = useOnboardingStore.getState();
      expect(reset.draft).toEqual(EMPTY_DRAFT);
      expect(reset.currentStep).toBe(1);
      expect(reset.submissionStatus).toBe("idle");
      expect(reset.submissionError).toBeNull();
    });
  });
});
