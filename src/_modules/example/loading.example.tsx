import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import AppLoadingIndicator from "@/_shared/design/components/loading/loading-indicator";
import { Button, ButtonText } from "@/_shared/design/ui/button";
import loadingStore from "@/store/loading.store";

export default function LoadingExample() {
  const _loadingStore = loadingStore((state) => state);

  const handleShowLoading = () => {
    _loadingStore.setShow(true, "Example loading...");
    setTimeout(() => _loadingStore.setShow(false), 3500);
  };

  return (
    <AppView>
      <AppText type="subtitle">Loading</AppText>
      <AppText>Indicator</AppText>
      <AppLoadingIndicator />
      <Button onPress={handleShowLoading}>
        <ButtonText>Show loading</ButtonText>
      </Button>
    </AppView>
  );
}
