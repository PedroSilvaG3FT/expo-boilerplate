import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { Stack } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function MainLayout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <AppView className="px-6">
        <AppText>Header</AppText>
      </AppView>

      <Stack screenOptions={{ headerShown: false }} />

      <AppView
        className="!bg-primary px-6 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <AppText>Footer</AppText>
      </AppView>
    </SafeAreaView>
  );
}
