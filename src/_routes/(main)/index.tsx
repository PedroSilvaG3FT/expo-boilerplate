import CalendarExample from "@/_modules/example/calendar.example";
import CameraExample from "@/_modules/example/camera.example";
import EnviromentExample from "@/_modules/example/enviroment.example";
import FormExample from "@/_modules/example/form.example";
import LoadingExample from "@/_modules/example/loading.example";
import RequestExample from "@/_modules/example/request.example";
import RulerPickerExample from "@/_modules/example/ruler-picker.example";
import SheetExample from "@/_modules/example/sheet.example";
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

        <RulerPickerExample />
        <Separator className="my-8" />

        <FormExample />
        <Separator className="my-8" />

        <EnviromentExample />
        <Separator className="my-8" />

        <LoadingExample />
        <Separator className="my-8" />

        <RequestExample />
        <Separator className="my-8" />

        <CameraExample />
        <Separator className="my-8" />

        <CalendarExample />
        <Separator className="my-8" />

        <SheetExample />

        <Link
          href="/(auth)/sign-in"
          className="w-full text-center mt-4 underline"
        >
          <AppText>Go to Login</AppText>
        </Link>
      </AppView>
    </ScrollView>
  );
}
