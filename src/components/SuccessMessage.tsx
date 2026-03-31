import React from "react";
import { View, Text } from "react-native";
import { useSuccessMessageStyles } from "./ScreenContainer.styles";

interface SuccessMessageProps {
  message: string;
  visible?: boolean;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  visible = true,
}) => {
  const styles = useSuccessMessageStyles();

  if (!visible || !message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
