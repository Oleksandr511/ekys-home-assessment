import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  OnboardingState,
  OnboardingDraft,
  OnboardingStep,
  EMPTY_DRAFT,
} from './types';
import { apiSubmit } from '../common/api.mocks';
import { useAuthStore } from '../auth/store';

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      draft: EMPTY_DRAFT,
      currentStep: 1,
      submissionStatus: 'idle',
      submissionError: null,

      updateDraftField: (step: OnboardingStep, field: string, value: any) => {
        set((state) => {
          const stepMap: Record<OnboardingStep, keyof OnboardingDraft> = {
            1: 'profile',
            2: 'document',
            3: 'selfie',
            4: 'address',
            5: 'consents',
          };

          const stepKey = stepMap[step];
          const newDraft = { ...state.draft };

          if (stepKey === 'profile') {
            newDraft.profile = { ...newDraft.profile, [field]: value };
          } else if (stepKey === 'document') {
            newDraft.document = { ...newDraft.document, [field]: value };
          } else if (stepKey === 'selfie') {
            newDraft.selfie = { ...newDraft.selfie, [field]: value };
          } else if (stepKey === 'address') {
            newDraft.address = { ...newDraft.address, [field]: value };
          } else if (stepKey === 'consents') {
            newDraft.consents = { ...newDraft.consents, [field]: value };
          }

          return { draft: newDraft };
        });
      },

      nextStep: () => {
        set((state) => {
          if (state.currentStep < 5) {
            return { currentStep: (state.currentStep + 1) as OnboardingStep };
          }
          return state;
        });
      },

      prevStep: () => {
        set((state) => {
          if (state.currentStep > 1) {
            return { currentStep: (state.currentStep - 1) as OnboardingStep };
          }
          return state;
        });
      },

      resetDraft: () => {
        set({
          draft: EMPTY_DRAFT,
          currentStep: 1,
          submissionStatus: 'idle',
          submissionError: null,
        });
      },

      submit: async (accessToken: string, refreshToken?: string) => {
        set({ submissionStatus: 'submitting', submissionError: null });
        try {
          const { draft } = get();

          // Try to submit with current token
          let result;
          try {
            result = await apiSubmit(accessToken, draft);
          } catch (error: any) {
            // If 401 and we have a refresh token, try refresh-then-retry
            if (error.statusCode === 401 && refreshToken) {
              try {
                // Refresh the token
                await useAuthStore.getState().refresh(refreshToken);

                // Get new token
                const newToken = useAuthStore.getState().session?.accessToken;
                if (!newToken) {
                  throw error;
                }

                // Retry submission
                result = await apiSubmit(newToken, draft);
              } catch (refreshError) {
                // If refresh fails, mark session as expired
                useAuthStore.getState().handleTokenExpiry();
                throw refreshError;
              }
            } else {
              throw error;
            }
          }

          set({
            submissionStatus: 'success',
            submissionError: null,
            draft: EMPTY_DRAFT,
            currentStep: 1,
          });

          return result;
        } catch (err) {
          const error = err instanceof Error ? err.message : 'Submission failed';
          set({
            submissionStatus: 'error',
            submissionError: error,
          });
          throw err;
        }
      },

      clearSubmissionState: () => {
        set({
          submissionStatus: 'idle',
          submissionError: null,
        });
      },

      getOnboardingStatus: () => {
        const { draft } = get();
        const hasAnyData =
          draft.profile.fullName ||
          draft.profile.dateOfBirth ||
          draft.profile.nationality ||
          draft.document.documentType ||
          draft.document.documentNumber ||
          draft.selfie.hasSelfie ||
          draft.address.addressLine1 ||
          draft.address.city ||
          draft.address.country ||
          draft.consents.termsAccepted;

        if (!hasAnyData) return 'not_started';
        return 'in_progress';
      },
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        draft: state.draft,
        currentStep: state.currentStep,
      }),
    }
  )
);
