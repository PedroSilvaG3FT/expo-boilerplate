/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { APP_THEME } from "@/_shared/constants/app-theme";
import { useColorScheme } from "@/_shared/design/lib/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof APP_THEME.light & keyof typeof APP_THEME.dark
) {
  const { colorScheme } = useColorScheme();
  const colorFromProps = props[colorScheme];

  if (colorFromProps) return colorFromProps;
  else return APP_THEME[colorScheme][colorName];
}
