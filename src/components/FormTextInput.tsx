import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../features/theme/provider';

interface FormTextInputProps extends Omit<TextInputProps, 'style'> {
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

  const styles = StyleSheet.create({
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
      borderColor: error ? tokens.colors.error : tokens.colors.border,
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
