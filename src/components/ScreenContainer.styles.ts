import { StyleSheet } from "react-native";
import { useTheme } from "../features/theme/provider";

export const useScreenContainerStyles = () => {
  const { tokens } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    content: {
      paddingHorizontal: tokens.spacing.lg,
      paddingVertical: tokens.spacing.lg,
    },
  });
};

export const useErrorMessageStyles = () => {
  const { tokens } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: tokens.colors.error,
      borderRadius: 8,
      padding: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
    },
    text: {
      color: tokens.colors.background,
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
    },
  });
};

export const useSuccessMessageStyles = () => {
  const { tokens } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: tokens.colors.success,
      borderRadius: 8,
      padding: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
    },
    text: {
      color: tokens.colors.background,
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
    },
  });
};
