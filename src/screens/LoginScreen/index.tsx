import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { useAuthStore } from "../../features/auth/store";
import { FormTextInput } from "../../components/FormTextInput";
import { Button } from "../../components/Button";
import {
  ScreenContainer,
  ErrorMessage,
} from "../../components/ScreenContainer";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthNavigatorParamList } from "../../navigators/auth";
import { useStyles } from "./styles";

type LoginScreenProps = NativeStackScreenProps<AuthNavigatorParamList, "Login">;

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { login, status, error } = useAuthStore();
  const styles = useStyles();

  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!email.includes("@")) {
      errors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 3) {
      errors.password = "Password must be at least 3 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      // Error is already set in store
      console.error("Login error:", err);
    }
  }, [email, password, validateForm, login]);

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

      <ErrorMessage message={error || ""} visible={!!error} />

      <FormTextInput
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (formErrors.email) {
            setFormErrors({ ...formErrors, email: "" });
          }
        }}
        error={formErrors.email}
        editable={status !== "logging_in"}
      />

      <FormTextInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (formErrors.password) {
            setFormErrors({ ...formErrors, password: "" });
          }
        }}
        error={formErrors.password}
        editable={status !== "logging_in"}
      />

      <Button
        label="Login"
        onPress={handleLogin}
        loading={status === "logging_in"}
        disabled={status === "logging_in"}
        size="large"
      />

      <Text style={styles.demoText}>
        This is a demo app. Validation is performed client-side.
      </Text>
    </ScreenContainer>
  );
};
