import { StyleSheet } from "react-native";
import { useTheme } from "../../features/theme/provider";

export const useHomeScreenStyles = () => {
  const { tokens } = useTheme();

  return StyleSheet.create({
    headerSection: {
      marginBottom: tokens.spacing.xl,
      backgroundColor: tokens.colors.surface,
      borderRadius: 12,
      padding: tokens.spacing.lg,
    },
    greeting: {
      fontSize: tokens.typography.fontSize.lg,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing.sm,
    },
    userName: {
      fontSize: tokens.typography.fontSize.xl,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.text,
    },
    section: {
      marginBottom: tokens.spacing.xl,
    },
    sectionTitle: {
      fontSize: tokens.typography.fontSize.lg,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.text,
      marginBottom: tokens.spacing.md,
    },
    statusCard: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 12,
      padding: tokens.spacing.lg,
      marginBottom: tokens.spacing.lg,
      borderLeftWidth: 4,
      borderLeftColor: tokens.colors.primary,
    },
    statusLabel: {
      fontSize: tokens.typography.fontSize.sm,
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing.xs,
    },
    statusValue: {
      fontSize: tokens.typography.fontSize.md,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.text,
    },
    completionCard: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 12,
      padding: tokens.spacing.lg,
      marginBottom: tokens.spacing.lg,
      borderLeftWidth: 4,
      borderLeftColor: tokens.colors.success,
    },
    completionIcon: {
      fontSize: 32,
      marginBottom: tokens.spacing.md,
    },
    completionTitle: {
      fontSize: tokens.typography.fontSize.lg,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.success,
      marginBottom: tokens.spacing.sm,
    },
    completionDate: {
      fontSize: tokens.typography.fontSize.sm,
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing.xs,
    },
    completionTime: {
      fontSize: tokens.typography.fontSize.sm,
      color: tokens.colors.textSecondary,
    },
    settingsButton: {
      alignSelf: "flex-end",
      marginBottom: tokens.spacing.lg,
    },
    settingsButtonText: {
      fontSize: tokens.typography.fontSize.md,
      color: tokens.colors.primary,
      fontWeight: tokens.typography.fontWeight.medium,
    },
  });
};
