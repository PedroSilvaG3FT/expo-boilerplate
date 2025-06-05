import AppRulerPicker from "@/_shared/design/components/app-ruler-picker";
import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";

export default function RulerPickerExample() {
  return (
    <AppView>
      <AppText type="subtitle">Ruler Picker</AppText>
      <AppRulerPicker />
    </AppView>
  );
}
