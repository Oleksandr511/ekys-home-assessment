import { StyleSheet } from "react-native";
import { useTheme } from "../../features/theme/provider";

export const useOnboardingScreenStyles = () => {
  const { tokens } = useTheme();

  return StyleSheet.create({
    stepIndicator: {
      flexDirection: "row",
      marginBottom: tokens.spacing.lg,
      justifyContent: "space-between",
      alignItems: "center",
    },
    stepDot: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
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
      flexDirection: "row",
      alignItems: "center",
      marginBottom: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      backgroundColor: tokens.colors.surface,
      borderRadius: 8,
      borderWidth: 0,
    },
    checkboxContainerError: {
      borderWidth: 1,
      borderColor: tokens.colors.error,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: tokens.colors.primary,
      borderRadius: 4,
      marginRight: tokens.spacing.md,
      justifyContent: "center",
      alignItems: "center",
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
      flexDirection: "row",
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
};
