import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAuthStore } from '../../features/auth/store';
import { useOnboardingStore } from '../../features/onboarding/store';
import { useTheme } from '../../features/theme/provider';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type HomeScreenProps = NativeStackScreenProps<any, 'Home'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { tokens } = useTheme();
  const { user, status } = useAuthStore();
  const { getOnboardingStatus } = useOnboardingStore();

  useEffect(() => {
    if (status === 'logged_out' || status === 'expired') {
      navigation.replace('AuthNavigator' as never);
    }
  }, [status, navigation]);

  const onboardingStatus = getOnboardingStatus();

  const getStatusText = (): string => {
    if (onboardingStatus === 'not_started') {
      return 'Not started';
    }
    return 'In progress';
  };

  const getStatusColor = (): string => {
    if (onboardingStatus === 'not_started') {
      return tokens.colors.warning;
    }
    return tokens.colors.primary;
  };

  const styles = StyleSheet.create({
    headerSection: {
      marginBottom: tokens.spacing.xl,
      backgroundColor: tokens.colors.surface,
      borderRadius: 12,
      padding: tokens.spacing.lg,
    },
    greeting: {
      fontSize: tokens.typography.fontSize.lg,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing.sm,
    },
    userName: {
      fontSize: tokens.typography.fontSize.xl,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.text,
    },
    section: {
      marginBottom: tokens.spacing.xl,
    },
    sectionTitle: {
      fontSize: tokens.typography.fontSize.lg,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.text,
      marginBottom: tokens.spacing.md,
    },
    statusCard: {
      backgroundColor: tokens.colors.surface,
      borderRadius: 12,
      padding: tokens.spacing.lg,
      marginBottom: tokens.spacing.lg,
      borderLeftWidth: 4,
      borderLeftColor: getStatusColor(),
    },
    statusLabel: {
      fontSize: tokens.typography.fontSize.sm,
      color: tokens.colors.textSecondary,
      marginBottom: tokens.spacing.xs,
    },
    statusValue: {
      fontSize: tokens.typography.fontSize.md,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.text,
    },
    settingsButton: {
      alignSelf: 'flex-end',
      marginBottom: tokens.spacing.lg,
    },
    settingsButtonText: {
      fontSize: tokens.typography.fontSize.md,
      color: tokens.colors.primary,
      fontWeight: tokens.typography.fontWeight.medium,
    },
  });

  return (
    <ScreenContainer>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings' as never)}
      >
        <Text style={styles.settingsButtonText}>⚙️ Settings</Text>
      </TouchableOpacity>

      <View style={styles.headerSection}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.fullName || 'User'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Onboarding Status</Text>
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Current Status</Text>
          <Text style={styles.statusValue}>{getStatusText()}</Text>
        </View>

        <Button
          label={
            onboardingStatus === 'not_started'
              ? 'Start Onboarding'
              : 'Resume Onboarding'
          }
          onPress={() => navigation.navigate('Onboarding' as never)}
          size="large"
        />
      </View>
    </ScreenContainer>
  );
};
