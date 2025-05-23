import { EThemeType } from "@/_shared/enums/theme.enum";
import uiStore from "@/store/ui.store";
import { Moon, Sun } from "lucide-react-native";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";

export default function AppToggleTheme() {
  const _uiStore = uiStore((state) => state);
  const isDarkMode = _uiStore.theme === "dark";

  const handleToggle = () => {
    if (isDarkMode) _uiStore.setTheme(EThemeType.light);
    else _uiStore.setTheme(EThemeType.dark);
  };

  return (
    <Button
      size="icon"
      onPress={handleToggle}
      className={cn("items-center justify-center rounded-full")}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
