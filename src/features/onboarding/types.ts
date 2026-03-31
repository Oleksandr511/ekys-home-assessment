export type SubmissionStatus = "idle" | "submitting" | "success" | "error";
export type OnboardingStep = 1 | 2 | 3 | 4 | 5;

// Type-safe draft field values
export type DraftFieldValue = string | boolean;

export interface OnboardingDraft {
  profile: {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
  };
  document: {
    documentType: string;
    documentNumber: string;
  };
  selfie: {
    hasSelfie: boolean;
  };
  address: {
    addressLine1: string;
    city: string;
    country: string;
  };
  consents: {
    termsAccepted: boolean;
  };
}

export const EMPTY_DRAFT: OnboardingDraft = {
  profile: {
    fullName: "",
    dateOfBirth: "",
    nationality: "",
  },
  document: {
    documentType: "",
    documentNumber: "",
  },
  selfie: {
    hasSelfie: false,
  },
  address: {
    addressLine1: "",
    city: "",
    country: "",
  },
  consents: {
    termsAccepted: false,
  },
};

export interface OnboardingState {
  draft: OnboardingDraft;
  currentStep: OnboardingStep;
  submissionStatus: SubmissionStatus;
  submissionError: string | null;
  isCompleted: boolean;
  completedAt: string | null;
  updateDraftField: (
    step: OnboardingStep,
    field: string,
    value: DraftFieldValue,
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetDraft: () => void;
  submit: (accessToken: string, refreshToken?: string) => Promise<boolean>;
  clearSubmissionState: () => void;
  getOnboardingStatus: () => "not_started" | "in_progress" | "completed";
}
