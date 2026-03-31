import React from "react";
import { View, Text, ScrollView, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useScreenContainerStyles,
  useErrorMessageStyles,
} from "./ScreenContainer.styles";

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
  const styles = useScreenContainerStyles();

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
  const styles = useErrorMessageStyles();

  if (!visible || !message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
