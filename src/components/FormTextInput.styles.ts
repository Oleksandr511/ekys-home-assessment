import { StyleSheet } from "react-native";
import { useTheme } from "../features/theme/provider";

interface FormTextInputStylesProps {
  hasError?: boolean;
}

export const useFormTextInputStyles = (props?: FormTextInputStylesProps) => {
  const { tokens } = useTheme();

  return StyleSheet.create({
    container: {
      marginBottom: tokens.spacing.md,
    },
    label: {
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.text,
      marginBottom: tokens.spacing.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: props?.hasError ? tokens.colors.error : tokens.colors.border,
      borderRadius: 8,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      fontSize: tokens.typography.fontSize.md,
      color: tokens.colors.text,
      backgroundColor: tokens.colors.surface,
    },
    errorText: {
      color: tokens.colors.error,
      fontSize: tokens.typography.fontSize.xs,
      marginTop: tokens.spacing.xs,
    },
    helperText: {
      color: tokens.colors.textSecondary,
      fontSize: tokens.typography.fontSize.xs,
      marginTop: tokens.spacing.xs,
    },
  });
};
