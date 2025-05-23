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
      <Stack screenOptions={{ headerShown: false }} />

      <AppView
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        className="!bg-secondary rounded-t-3xl px-6 pt-4 flex justify-center items-center"
      >
        <AppText>Footer</AppText>
      </AppView>
    </SafeAreaView>
  );
}
