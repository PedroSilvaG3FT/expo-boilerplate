import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { Button } from "@/_shared/design/ui/button";
import React from "react";
import { Text } from "react-native";

export default function RequestExample() {
  const handleRequestClick = () => {};

  return (
    <AppView>
      <AppText type="subtitle">Request</AppText>
      <Button onPress={handleRequestClick}>
        <Text>Request</Text>
      </Button>
    </AppView>
  );
}
