import { StyleSheet } from "react-native";
import { useTheme } from "../../features/theme/provider";

export const useSettingsScreenStyles = () => {
  const { tokens } = useTheme();

  return StyleSheet.create({
    section: {
      marginBottom: tokens.spacing.xl,
    },
    sectionTitle: {
      fontSize: tokens.typography.fontSize.lg,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.text,
      marginBottom: tokens.spacing.md,
    },
    card: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 12,
      padding: tokens.spacing.lg,
      marginBottom: tokens.spacing.md,
    },
    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: tokens.spacing.md,
    },
    cardRowLast: {
      marginBottom: 0,
    },
    label: {
      fontSize: tokens.typography.fontSize.md,
      color: tokens.colors.text,
      fontWeight: tokens.typography.fontWeight.medium,
    },
    value: {
      fontSize: tokens.typography.fontSize.md,
      color: tokens.colors.textSecondary,
    },
    themeToggleButton: {
      flexDirection: "row",
      backgroundColor: tokens.colors.primary,
      borderRadius: 8,
      overflow: "hidden",
      marginTop: tokens.spacing.sm,
    },
    themeOption: {
      flex: 1,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      alignItems: "center",
      backgroundColor: tokens.colors.primary,
    },
    themeOptionActive: {
      backgroundColor: tokens.colors.primaryLight,
    },
    themeOptionText: {
      color: tokens.colors.background,
      fontWeight: tokens.typography.fontWeight.medium,
      fontSize: tokens.typography.fontSize.sm,
    },
    themeOptionTextActive: {
      color: tokens.colors.primary,
    },
    appInfo: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 12,
      padding: tokens.spacing.lg,
    },
    appName: {
      fontSize: tokens.typography.fontSize.md,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.text,
      marginBottom: tokens.spacing.sm,
    },
    appVersion: {
      fontSize: tokens.typography.fontSize.sm,
      color: tokens.colors.textSecondary,
    },
  });
};
