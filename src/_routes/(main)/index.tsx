import FormExample from "@/_modules/example/form-example";
import AppText from "@/_shared/design/components/app-text";
import AppToggleTheme from "@/_shared/design/components/app-toggle-theme";
import AppView from "@/_shared/design/components/app-view";
import { Separator } from "@/_shared/design/ui/separator";
import { Link } from "expo-router";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <AppView className="p-6 h-full">
        <AppView className="flex-row justify-between items-center">
          <AppText className="font-semibold" type="title">
            Home
          </AppText>

          <AppToggleTheme />
        </AppView>

        <Separator className="my-8" />

        <FormExample />

        <Link href="/(auth)/sign-in">
          <AppText>Login</AppText>
        </Link>
      </AppView>
    </ScrollView>
  );
}
