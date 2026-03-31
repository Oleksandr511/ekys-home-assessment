import { StyleSheet } from "react-native";
import { useTheme } from "../../features/theme/provider";

export const useStyles = () => {
  const { tokens } = useTheme();

  return StyleSheet.create({
    titleSection: {
      marginBottom: tokens.spacing.xl,
      alignItems: "center",
    },
    title: {
      fontSize: tokens.typography.fontSize.xl,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.text,
      marginBottom: tokens.spacing.sm,
    },
    subtitle: {
      fontSize: tokens.typography.fontSize.md,
      color: tokens.colors.textSecondary,
    },
    demoText: {
      fontSize: tokens.typography.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginTop: tokens.spacing.md,
      fontStyle: "italic",
    },
    demoBox: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 8,
      padding: tokens.spacing.md,
      marginBottom: tokens.spacing.lg,
      borderLeftWidth: 4,
      borderLeftColor: tokens.colors.primary,
    },
    demoTitle: {
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.text,
      marginBottom: tokens.spacing.sm,
    },
    demoCredential: {
      fontSize: tokens.typography.fontSize.xs,
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing.xs,
    },
    demoCode: {
      fontFamily: "Menlo",
      color: tokens.colors.primary,
    },
  });
};
