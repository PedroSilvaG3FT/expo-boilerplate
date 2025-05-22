import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { Button } from "@/_shared/design/ui/button";
import { Input } from "@/_shared/design/ui/input";
import { EThemeType } from "@/_shared/enums/theme.enum";
import uiStore from "@/store/ui.store";

export default function HomeScreen() {
  const _uiStore = uiStore((state) => state);

  return (
    <AppView className="p-6 h-full space-y-10">
      <AppText>Home</AppText>
      <Input placeholder="Olá" className="my-12" />

      <Button
        onPress={() => {
          if (_uiStore.theme === "dark") _uiStore.setTheme(EThemeType.light);
          else _uiStore.setTheme(EThemeType.dark);
        }}
      >
        <AppText>Toggle theme kjhkjh</AppText>
      </Button>
    </AppView>
  );
}
