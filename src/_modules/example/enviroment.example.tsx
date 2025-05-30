import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { enviroments } from "@/_shared/enviroments";

export default function EnviromentExample() {
  return (
    <AppView>
      <AppText type="subtitle">Enviroment</AppText>
      <AppText>Example 1: {enviroments.EXPO_PUBLIC_API_KEY}</AppText>
      <AppText>Example 2: {enviroments.EXPO_PUBLIC_API_URL}</AppText>
    </AppView>
  );
}
