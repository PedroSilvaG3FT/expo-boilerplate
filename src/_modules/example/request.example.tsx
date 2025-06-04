import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { Button, ButtonText } from "@/_shared/design/ui/button";
import React from "react";

export default function RequestExample() {
  const handleRequestClick = () => {};

  return (
    <AppView>
      <AppText type="subtitle">Request</AppText>
      <Button onPress={handleRequestClick}>
        <ButtonText>Request</ButtonText>
      </Button>
    </AppView>
  );
}
