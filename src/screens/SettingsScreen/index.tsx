import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAuthStore } from '../../features/auth/store';
import { useTheme } from '../../features/theme/provider';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type SettingsScreenProps = NativeStackScreenProps<any, 'Settings'>;

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {
  const { tokens, theme, setTheme } = useTheme();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigation.replace('AuthNavigator' as never);
  };

  const handleThemeToggle = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    await setTheme(newTheme);
  };

  const styles = StyleSheet.create({
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      flexDirection: 'row',
      backgroundColor: tokens.colors.primary,
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: tokens.spacing.sm,
    },
    themeOption: {
      flex: 1,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      alignItems: 'center',
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

  return (
    <ScreenContainer>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Theme</Text>
            <Text style={styles.value}>
              {theme === 'light' ? '☀️' : '🌙'} {theme === 'light' ? 'Light' : 'Dark'}
            </Text>
          </View>

          <View style={styles.themeToggleButton}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                theme === 'light' && styles.themeOptionActive,
              ]}
              onPress={() => theme !== 'light' && handleThemeToggle()}
            >
              <Text
                style={[
                  styles.themeOptionText,
                  theme === 'light' && styles.themeOptionTextActive,
                ]}
              >
                ☀️ Light
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.themeOption,
                theme === 'dark' && styles.themeOptionActive,
              ]}
              onPress={() => theme !== 'dark' && handleThemeToggle()}
            >
              <Text
                style={[
                  styles.themeOptionText,
                  theme === 'dark' && styles.themeOptionTextActive,
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
