import { StyleSheet } from "react-native";
import { useTheme } from "../features/theme/provider";

interface ButtonStylesProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  isDisabled?: boolean;
}

export const useButtonStyles = (props?: ButtonStylesProps) => {
  const { tokens } = useTheme();
  const variant = props?.variant || "primary";
  const size = props?.size || "medium";
  const isDisabled = props?.isDisabled || false;

  return StyleSheet.create({
    container: {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      minHeight: size === "small" ? 36 : size === "large" ? 52 : 44,
      paddingHorizontal: tokens.spacing.lg,
      backgroundColor:
        variant === "primary"
          ? isDisabled
            ? tokens.colors.primaryLight
            : tokens.colors.primary
          : variant === "secondary"
            ? tokens.colors.secondary
            : "transparent",
      borderWidth: variant === "outline" ? 1 : 0,
      borderColor:
        variant === "outline" ? tokens.colors.primary : "transparent",
      opacity: isDisabled ? 0.5 : 1,
    },
    text: {
      fontSize:
        size === "small"
          ? tokens.typography.fontSize.sm
          : size === "large"
            ? tokens.typography.fontSize.lg
            : tokens.typography.fontSize.md,
      fontWeight: tokens.typography.fontWeight.medium,
      color:
        variant === "outline"
          ? tokens.colors.primary
          : tokens.colors.background,
    },
  });
};
