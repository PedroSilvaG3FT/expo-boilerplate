import loadingStore from "@/store/loading.store";
import React from "react";
import { Text, View } from "react-native";
import AppLoadingIndicator from "./loading-indicator";

export default function AppLoading() {
  const _loadingStore = loadingStore((state) => state);

  if (!_loadingStore.show) return null;

  return (
    <View className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
      <AppLoadingIndicator className="w-24 h-24" />
      {!!_loadingStore.message && (
        <Text className="mt-4 text-center text-white font-medium">
          {_loadingStore.message}
        </Text>
      )}
    </View>
  );
}
