import React from 'react';
import { View, Text, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../features/theme/provider';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = true,
  style,
}) => {
  const { tokens } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    content: {
      paddingHorizontal: tokens.spacing.lg,
      paddingVertical: tokens.spacing.lg,
    },
  });

  if (!scrollable) {
    return (
      <SafeAreaView style={[styles.container, style]}>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, style]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

interface ErrorMessageProps {
  message: string;
  visible?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  visible = true,
}) => {
  const { tokens } = useTheme();

  if (!visible || !message) return null;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: tokens.colors.error,
      borderRadius: 8,
      padding: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
    },
    text: {
      color: tokens.colors.background,
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

interface SuccessMessageProps {
  message: string;
  visible?: boolean;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  visible = true,
}) => {
  const { tokens } = useTheme();

  if (!visible || !message) return null;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: tokens.colors.success,
      borderRadius: 8,
      padding: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
    },
    text: {
      color: tokens.colors.background,
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
