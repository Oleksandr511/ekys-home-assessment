import React, { useEffect } from 'react';
import { ActivityIndicator, View, Alert } from 'react-native';
import { useAuthStore } from '../features/auth/store';
import { useTheme } from '../features/theme/provider';
import { useAuthGuard } from '../features/auth/useAuthGuard';
import { AuthNavigator } from './auth';
import { HomeNavigator } from './home';

export const RootNavigator = () => {
  const status = useAuthStore((state) => state.status);
  const { tokens } = useTheme();
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Use auth guard to check token expiry
  useAuthGuard();

  useEffect(() => {
    // Show alert if session expired
    if (status === 'expired') {
      Alert.alert(
        'Session Expired',
        'Your session has expired. Please login again.',
        [{ text: 'OK' }]
      );
    }
  }, [status]);

  useEffect(() => {
    // Mark as hydrated after first render
    const timer = setTimeout(() => setIsHydrated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: tokens.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={tokens.colors.primary} />
      </View>
    );
  }

  const isAuthenticated = status === 'logged_in';

  return isAuthenticated ? <HomeNavigator /> : <AuthNavigator />;
};
