import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../features/auth/store";
import { useTheme } from "../../features/theme/provider";
import { Button } from "../../components/Button";
import { ScreenContainer } from "../../components/ScreenContainer";
import { useSettingsScreenStyles } from "./useStyles";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeNavigatorParamList } from "../../navigators/home";

type SettingsScreenProps = NativeStackScreenProps<HomeNavigatorParamList, "Settings">;

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const { tokens, theme, setTheme } = useTheme();
  const { logout } = useAuthStore();
  const styles = useSettingsScreenStyles();

  const handleLogout = () => {
    logout();
  };

  const handleThemeToggle = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    await setTheme(newTheme);
  };

  return (
    <ScreenContainer>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Theme</Text>
            <Text style={styles.value}>
              {theme === "light" ? "☀️" : "🌙"}{" "}
              {theme === "light" ? "Light" : "Dark"}
            </Text>
          </View>

          <View style={styles.themeToggleButton}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                theme === "light" && styles.themeOptionActive,
              ]}
              onPress={() => theme !== "light" && handleThemeToggle()}
            >
              <Text
                style={[
                  styles.themeOptionText,
                  theme === "light" && styles.themeOptionTextActive,
                ]}
              >
                ☀️ Light
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.themeOption,
                theme === "dark" && styles.themeOptionActive,
              ]}
              onPress={() => theme !== "dark" && handleThemeToggle()}
            >
              <Text
                style={[
                  styles.themeOptionText,
                  theme === "dark" && styles.themeOptionTextActive,
                ]}
              >
                🌙 Dark
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <Button
            label="Logout"
            onPress={handleLogout}
            variant="outline"
            size="large"
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.appInfo}>
          <Text style={styles.appName}>eKYC Onboarding App</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={[styles.appVersion, { marginTop: tokens.spacing.md }]}>
            An electronic Know Your Customer (eKYC) onboarding application.
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
};
