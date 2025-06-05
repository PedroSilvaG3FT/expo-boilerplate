import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
