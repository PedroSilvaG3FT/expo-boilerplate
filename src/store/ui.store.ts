import { EThemeType } from "@/_shared/enums/theme.enum";
import { createStore } from "./_base.store";

interface State {
  theme: EThemeType;
  setTheme: (theme: EThemeType) => void;
}

const uiStore = createStore<State>({
  name: "ui",
  state: (set) => ({
    theme: EThemeType.dark,
    setTheme: (theme) => set({ theme }),
  }),
});

export default uiStore;
