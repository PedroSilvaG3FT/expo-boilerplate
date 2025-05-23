import FormExample from "@/_modules/example/form-example";
import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { Button } from "@/_shared/design/ui/button";
import { EThemeType } from "@/_shared/enums/theme.enum";
import uiStore from "@/store/ui.store";
import { Link } from "expo-router";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  const _uiStore = uiStore((state) => state);

  return (
    <ScrollView>
      <AppView className="p-6 h-full">
        <AppText>Home</AppText>

        <FormExample />

        <Button
          className="mt-4"
          onPress={() => {
            if (_uiStore.theme === "dark") _uiStore.setTheme(EThemeType.light);
            else _uiStore.setTheme(EThemeType.dark);
          }}
        >
          <AppText>Toggle theme</AppText>
        </Button>

        <Link href="/(auth)/sign-in">
          <AppText>Login</AppText>
        </Link>
      </AppView>
    </ScrollView>
  );
}
