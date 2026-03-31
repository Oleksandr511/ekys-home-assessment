import React from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
} from "react-native";
import { useButtonStyles } from "./Button.styles";

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "medium",
  style,
}) => {
  const isDisabled = disabled || loading;
  const styles = useButtonStyles({ variant, size, isDisabled });

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{loading ? "Loading..." : label}</Text>
    </TouchableOpacity>
  );
};
