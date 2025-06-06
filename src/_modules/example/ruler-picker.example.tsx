import AppRulerPicker from "@/_shared/design/components/app-ruler-picker";
import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { useState } from "react";

export default function RulerPickerExample() {
  const [value, setValue] = useState(0);

  return (
    <AppView>
      <AppText type="subtitle">Ruler Picker</AppText>
      <AppText>Value: {value}</AppText>
      <AppRulerPicker initialValue={20} onChange={(data) => setValue(data)} />
    </AppView>
  );
}
