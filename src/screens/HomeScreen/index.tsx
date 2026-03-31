import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../features/auth/store";
import { useOnboardingStore } from "../../features/onboarding/store";
import { Button } from "../../components/Button";
import { ScreenContainer } from "../../components/ScreenContainer";
import { useHomeScreenStyles } from "./useStyles";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeNavigatorParamList } from "../../navigators/home";

type HomeScreenProps = NativeStackScreenProps<HomeNavigatorParamList, "Home">;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuthStore();
  const { getOnboardingStatus, isCompleted, completedAt } = useOnboardingStore();
  const styles = useHomeScreenStyles();

  const onboardingStatus = getOnboardingStatus();

  const getStatusText = (): string => {
    if (onboardingStatus === "not_started") {
      return "Not started";
    }
    if (onboardingStatus === "completed") {
      return "Completed";
    }
    return "In progress";
  };

  const formatDate = (isoString: string | null): string => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (isoString: string | null): string => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScreenContainer>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.settingsButtonText}>⚙️ Settings</Text>
      </TouchableOpacity>

      <View style={styles.headerSection}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.fullName || "User"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Onboarding Status</Text>
        {isCompleted && completedAt ? (
          <View style={styles.completionCard}>
            <Text style={styles.completionIcon}>✓</Text>
            <Text style={styles.completionTitle}>Verification Complete</Text>
            <Text style={styles.completionDate}>
              Completed on {formatDate(completedAt)}
            </Text>
            <Text style={styles.completionTime}>{formatTime(completedAt)}</Text>
          </View>
        ) : (
          <>
            <View style={styles.statusCard}>
              <Text style={styles.statusLabel}>Current Status</Text>
              <Text style={styles.statusValue}>{getStatusText()}</Text>
            </View>

            {onboardingStatus !== "completed" && (
              <Button
                label={
                  onboardingStatus === "not_started"
                    ? "Start Onboarding"
                    : "Resume Onboarding"
                }
                onPress={() =>
                  navigation.navigate("Onboarding", {})
                }
                size="large"
              />
            )}
          </>
        )}
      </View>
    </ScreenContainer>
  );
};
