import React from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
} from "react-native";
import { useTheme } from "../features/theme/provider";
import { useFormTextInputStyles } from "./FormTextInput.styles";

interface FormTextInputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  error,
  helperText,
  ...props
}) => {
  const { tokens } = useTheme();
  const styles = useFormTextInputStyles({ hasError: !!error });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={tokens.colors.textSecondary}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};
