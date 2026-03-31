import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../features/theme/provider';

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  style,
}) => {
  const { tokens } = useTheme();
  const isDisabled = disabled || loading;

  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight:
        size === 'small'
          ? 36
          : size === 'large'
            ? 52
            : 44,
      paddingHorizontal: tokens.spacing.lg,
      backgroundColor:
        variant === 'primary'
          ? isDisabled
            ? tokens.colors.primaryLight
            : tokens.colors.primary
          : variant === 'secondary'
            ? tokens.colors.secondary
            : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor:
        variant === 'outline' ? tokens.colors.primary : 'transparent',
      opacity: isDisabled ? 0.5 : 1,
    },
    text: {
      fontSize:
        size === 'small'
          ? tokens.typography.fontSize.sm
          : size === 'large'
            ? tokens.typography.fontSize.lg
            : tokens.typography.fontSize.md,
      fontWeight: tokens.typography.fontWeight.medium,
      color:
        variant === 'outline' ? tokens.colors.primary : tokens.colors.background,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>
        {loading ? 'Loading...' : label}
      </Text>
    </TouchableOpacity>
  );
};
