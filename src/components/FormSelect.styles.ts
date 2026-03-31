import { StyleSheet } from "react-native";
import { useTheme } from "../features/theme/provider";

interface FormSelectStylesProps {
  hasError?: boolean;
  hasValue?: boolean;
}

export const useFormSelectStyles = (props?: FormSelectStylesProps) => {
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
    button: {
      borderWidth: 1,
      borderColor: props?.hasError ? tokens.colors.error : tokens.colors.border,
      borderRadius: 8,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      backgroundColor: tokens.colors.surface,
      justifyContent: "center",
      minHeight: 44,
    },
    buttonText: {
      fontSize: tokens.typography.fontSize.md,
      color: props?.hasValue ? tokens.colors.text : tokens.colors.textSecondary,
    },
    modal: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: tokens.colors.background,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      maxHeight: "70%",
    },
    optionItem: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border,
    },
    optionText: {
      fontSize: tokens.typography.fontSize.md,
      color: tokens.colors.text,
    },
    errorText: {
      color: tokens.colors.error,
      fontSize: tokens.typography.fontSize.xs,
      marginTop: tokens.spacing.xs,
    },
  });
};
