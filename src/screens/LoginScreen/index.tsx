import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuthStore } from '../../features/auth/store';
import { useTheme } from '../../features/theme/provider';
import { FormTextInput } from '../../components/FormTextInput';
import { Button } from '../../components/Button';
import { ScreenContainer, ErrorMessage } from '../../components/ScreenContainer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type LoginScreenProps = NativeStackScreenProps<any, 'Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { tokens } = useTheme();
  const { login, status, error, setError } = useAuthStore();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status === 'logged_in') {
      navigation.replace('HomeNavigator' as never);
    }
  }, [status, navigation]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!email.includes('@')) {
      errors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 3) {
      errors.password = 'Password must be at least 3 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      // Error is already set in store
      console.error('Login failed:', err);
    }
  };

  const styles = StyleSheet.create({
    titleSection: {
      marginBottom: tokens.spacing.xl,
      alignItems: 'center',
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
      fontStyle: 'italic',
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
      fontFamily: 'Menlo',
      color: tokens.colors.primary,
    },
  });

  return (
    <ScreenContainer>
      <View style={styles.titleSection}>
        <Text style={styles.title}>eKYC Onboarding</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>
      </View>

      <View style={styles.demoBox}>
        <Text style={styles.demoTitle}>Demo Credentials:</Text>
        <Text style={styles.demoCredential}>
          Email: <Text style={styles.demoCode}>test@example.com</Text>
        </Text>
        <Text style={styles.demoCredential}>
          Password: <Text style={styles.demoCode}>password123</Text>
        </Text>
      </View>

      <ErrorMessage message={error || ''} visible={!!error} />

      <FormTextInput
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (formErrors.email) {
            setFormErrors({ ...formErrors, email: '' });
          }
        }}
        error={formErrors.email}
        editable={status !== 'logging_in'}
      />

      <FormTextInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (formErrors.password) {
            setFormErrors({ ...formErrors, password: '' });
          }
        }}
        error={formErrors.password}
        editable={status !== 'logging_in'}
      />

      <Button
        label="Login"
        onPress={handleLogin}
        loading={status === 'logging_in'}
        disabled={status === 'logging_in'}
        size="large"
      />

      <Text style={styles.demoText}>
        This is a demo app. Validation is performed client-side.
      </Text>
    </ScreenContainer>
  );
};
