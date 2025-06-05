import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { Button, ButtonText } from "@/_shared/design/ui/button";
import { useSheet } from "@/contexts/sheet.context";
import React from "react";
import { Text } from "react-native";

export default function SheetExample() {
  const { open, close } = useSheet();

  const handleOpen = () => {
    const content = (
      <AppView className="min-h-[400px]">
        <Text>Este conteúdo veio dinamicamente!</Text>
        <Button onPress={close}>
          <ButtonText>Fechar</ButtonText>
        </Button>
      </AppView>
    );

    open(content, ["90%"]);
  };

  return (
    <AppView>
      <AppText type="subtitle">Sheet modal</AppText>

      <Button onPress={handleOpen}>
        <ButtonText>Open</ButtonText>
      </Button>
    </AppView>
  );
}
