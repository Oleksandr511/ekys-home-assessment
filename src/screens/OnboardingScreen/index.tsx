import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useOnboardingStore } from '../../features/onboarding/store';
import { useAuthStore } from '../../features/auth/store';
import { useTheme } from '../../features/theme/provider';
import { FormTextInput } from '../../components/FormTextInput';
import { FormSelect } from '../../components/FormSelect';
import { Button } from '../../components/Button';
import {
  ScreenContainer,
  ErrorMessage,
  SuccessMessage,
} from '../../components/ScreenContainer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type OnboardingScreenProps = NativeStackScreenProps<any, 'Onboarding'>;

const DOCUMENT_TYPES = [
  { label: 'Passport', value: 'PASSPORT' },
  { label: 'Driver License', value: 'DRIVER_LICENSE' },
  { label: 'National ID', value: 'NATIONAL_ID' },
];

const COUNTRIES = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Australia', value: 'AU' },
];

const NATIONALITIES = [
  { label: 'American', value: 'US' },
  { label: 'Canadian', value: 'CA' },
  { label: 'British', value: 'UK' },
  { label: 'Australian', value: 'AU' },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  navigation,
}) => {
  const { tokens } = useTheme();
  const { session } = useAuthStore();
  const {
    draft,
    currentStep,
    updateDraftField,
    nextStep,
    prevStep,
    submit,
    submissionStatus,
    submissionError,
    clearSubmissionState,
  } = useOnboardingStore();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!draft.profile.fullName?.trim()) {
        errors.fullName = 'Full name is required';
      }
      if (!draft.profile.dateOfBirth?.trim()) {
        errors.dateOfBirth = 'Date of birth is required';
      }
      if (!draft.profile.nationality?.trim()) {
        errors.nationality = 'Nationality is required';
      }
    } else if (currentStep === 2) {
      if (!draft.document.documentType?.trim()) {
        errors.documentType = 'Document type is required';
      }
      if (!draft.document.documentNumber?.trim()) {
        errors.documentNumber = 'Document number is required';
      }
    } else if (currentStep === 4) {
      if (!draft.address.addressLine1?.trim()) {
        errors.addressLine1 = 'Address line is required';
      }
      if (!draft.address.city?.trim()) {
        errors.city = 'City is required';
      }
      if (!draft.address.country?.trim()) {
        errors.country = 'Country is required';
      }
    } else if (currentStep === 5) {
      if (!draft.consents.termsAccepted) {
        errors.terms = 'You must accept the terms and conditions';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      nextStep();
      setFormErrors({});
    }
  };

  const handlePrevStep = () => {
    prevStep();
    setFormErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    if (!session?.accessToken || !session?.refreshToken) {
      setFormErrors({ submit: 'Not authenticated' });
      return;
    }

    try {
      await submit(session.accessToken, session.refreshToken);
      navigation.replace('Home' as never);
    } catch (err) {
      // Error is already set in store
      console.error('Submission failed:', err);
    }
  };

  const styles = StyleSheet.create({
    stepIndicator: {
      flexDirection: 'row',
      marginBottom: tokens.spacing.lg,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    stepDot: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: tokens.colors.surface,
    },
    stepDotActive: {
      backgroundColor: tokens.colors.primary,
    },
    stepDotText: {
      color: tokens.colors.text,
      fontWeight: tokens.typography.fontWeight.medium,
    },
    stepDotTextActive: {
      color: tokens.colors.background,
    },
    stepLine: {
      flex: 1,
      height: 2,
      backgroundColor: tokens.colors.border,
      marginHorizontal: tokens.spacing.sm,
    },
    stepLineActive: {
      backgroundColor: tokens.colors.primary,
    },
    stepTitle: {
      fontSize: tokens.typography.fontSize.lg,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.text,
      marginBottom: tokens.spacing.lg,
    },
    formSection: {
      marginBottom: tokens.spacing.xl,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      backgroundColor: tokens.colors.surface,
      borderRadius: 8,
      borderWidth: formErrors.terms ? 1 : 0,
      borderColor: tokens.colors.error,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: tokens.colors.primary,
      borderRadius: 4,
      marginRight: tokens.spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: tokens.colors.primary,
    },
    checkboxText: {
      flex: 1,
      fontSize: tokens.typography.fontSize.md,
      color: tokens.colors.text,
    },
    buttonGroup: {
      flexDirection: 'row',
      gap: tokens.spacing.md,
      marginTop: tokens.spacing.xl,
    },
    button: {
      flex: 1,
    },
    reviewSection: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 12,
      padding: tokens.spacing.lg,
      marginBottom: tokens.spacing.lg,
    },
    reviewTitle: {
      fontSize: tokens.typography.fontSize.md,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.text,
      marginBottom: tokens.spacing.md,
    },
    reviewItem: {
      marginBottom: tokens.spacing.md,
      paddingBottom: tokens.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border,
    },
    reviewLabel: {
      fontSize: tokens.typography.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing.xs,
    },
    reviewValue: {
      fontSize: tokens.typography.fontSize.md,
      color: tokens.colors.text,
      fontWeight: tokens.typography.fontWeight.medium,
    },
  });

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4, 5].map((step) => (
          <View key={step} style={{ flex: 1, alignItems: 'center' }}>
            <View
              style={[
                styles.stepDot,
                step <= currentStep && styles.stepDotActive,
              ]}
            >
              <Text
                style={[
                  styles.stepDotText,
                  step <= currentStep && styles.stepDotTextActive,
                ]}
              >
                {step}
              </Text>
            </View>
            {step < 5 && (
              <View
                style={[
                  styles.stepLine,
                  step < currentStep && styles.stepLineActive,
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderStep1 = () => (
    <View style={styles.formSection}>
      <Text style={styles.stepTitle}>Step 1: Profile Information</Text>
      <FormTextInput
        label="Full Name"
        placeholder="Enter your full name"
        value={draft.profile.fullName}
        onChangeText={(text) => updateDraftField(1, 'fullName', text)}
        error={formErrors.fullName}
      />
      <FormTextInput
        label="Date of Birth"
        placeholder="YYYY-MM-DD"
        value={draft.profile.dateOfBirth}
        onChangeText={(text) => updateDraftField(1, 'dateOfBirth', text)}
        error={formErrors.dateOfBirth}
        helperText="Format: YYYY-MM-DD (e.g., 1990-05-15)"
      />
      <FormSelect
        label="Nationality"
        options={NATIONALITIES}
        value={draft.profile.nationality}
        onValueChange={(value) => updateDraftField(1, 'nationality', value)}
        error={formErrors.nationality}
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.formSection}>
      <Text style={styles.stepTitle}>Step 2: Document Information</Text>
      <FormSelect
        label="Document Type"
        options={DOCUMENT_TYPES}
        value={draft.document.documentType}
        onValueChange={(value) => updateDraftField(2, 'documentType', value)}
        error={formErrors.documentType}
      />
      <FormTextInput
        label="Document Number"
        placeholder="Enter document number"
        value={draft.document.documentNumber}
        onChangeText={(text) => updateDraftField(2, 'documentNumber', text)}
        error={formErrors.documentNumber}
      />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.formSection}>
      <Text style={styles.stepTitle}>Step 3: Capture Selfie</Text>
      <Button
        label={draft.selfie.hasSelfie ? '✓ Selfie Captured' : 'Capture Selfie'}
        onPress={() => updateDraftField(3, 'hasSelfie', true)}
        variant={draft.selfie.hasSelfie ? 'outline' : 'primary'}
        size="large"
      />
      <Text
        style={[
          styles.stepTitle,
          {
            marginTop: tokens.spacing.lg,
            fontSize: tokens.typography.fontSize.sm,
            color: tokens.colors.textSecondary,
          },
        ]}
      >
        (This is a placeholder. In a real app, this would open the camera.)
      </Text>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.formSection}>
      <Text style={styles.stepTitle}>Step 4: Address Information</Text>
      <FormTextInput
        label="Address Line 1"
        placeholder="Enter your address"
        value={draft.address.addressLine1}
        onChangeText={(text) => updateDraftField(4, 'addressLine1', text)}
        error={formErrors.addressLine1}
      />
      <FormTextInput
        label="City"
        placeholder="Enter your city"
        value={draft.address.city}
        onChangeText={(text) => updateDraftField(4, 'city', text)}
        error={formErrors.city}
      />
      <FormSelect
        label="Country"
        options={COUNTRIES}
        value={draft.address.country}
        onValueChange={(value) => updateDraftField(4, 'country', value)}
        error={formErrors.country}
      />
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.formSection}>
      <Text style={styles.stepTitle}>Step 5: Review & Submit</Text>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewTitle}>Profile</Text>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Full Name</Text>
          <Text style={styles.reviewValue}>{draft.profile.fullName}</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Date of Birth</Text>
          <Text style={styles.reviewValue}>{draft.profile.dateOfBirth}</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Nationality</Text>
          <Text style={styles.reviewValue}>
            {
              NATIONALITIES.find((n) => n.value === draft.profile.nationality)
                ?.label
            }
          </Text>
        </View>
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewTitle}>Document</Text>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Document Type</Text>
          <Text style={styles.reviewValue}>
            {
              DOCUMENT_TYPES.find((d) => d.value === draft.document.documentType)
                ?.label
            }
          </Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Document Number</Text>
          <Text style={styles.reviewValue}>
            {draft.document.documentNumber}
          </Text>
        </View>
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewTitle}>Address</Text>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Address</Text>
          <Text style={styles.reviewValue}>{draft.address.addressLine1}</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>City, Country</Text>
          <Text style={styles.reviewValue}>
            {draft.address.city}, {draft.address.country}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() =>
          updateDraftField(5, 'termsAccepted', !draft.consents.termsAccepted)
        }
      >
        <View
          style={[
            styles.checkbox,
            draft.consents.termsAccepted && styles.checkboxChecked,
          ]}
        >
          {draft.consents.termsAccepted && (
            <Text style={{ color: tokens.colors.background }}>✓</Text>
          )}
        </View>
        <Text style={styles.checkboxText}>
          I accept the terms and conditions
        </Text>
      </TouchableOpacity>

      {formErrors.terms && (
        <ErrorMessage message={formErrors.terms} visible={true} />
      )}
    </View>
  );

  return (
    <ScreenContainer scrollable={true}>
      {renderStepIndicator()}

      <ErrorMessage
        message={submissionError || formErrors.submit || ''}
        visible={!!(submissionError || formErrors.submit)}
      />

      <SuccessMessage
        message="Onboarding completed successfully!"
        visible={submissionStatus === 'success'}
      />

      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
      {currentStep === 5 && renderStep5()}

      <View style={styles.buttonGroup}>
        {currentStep > 1 && (
          <Button
            label="Previous"
            onPress={handlePrevStep}
            variant="outline"
            style={styles.button}
          />
        )}

        {currentStep < 5 ? (
          <Button
            label="Next"
            onPress={handleNextStep}
            style={styles.button}
          />
        ) : (
          <Button
            label={submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
            onPress={handleSubmit}
            loading={submissionStatus === 'submitting'}
            disabled={submissionStatus === 'submitting'}
            style={styles.button}
          />
        )}
      </View>
    </ScreenContainer>
  );
};
