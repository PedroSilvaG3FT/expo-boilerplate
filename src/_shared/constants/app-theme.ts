import { NAV_THEME } from "@/_shared/design/lib/constants";

export const APP_THEME = {
  light: {
    text: NAV_THEME.light.text,
    background: NAV_THEME.light.background,
    tint: NAV_THEME.light.primary,
    icon: NAV_THEME.light.primary,
    tabIconDefault: NAV_THEME.light.primary,
    tabIconSelected: NAV_THEME.light.notification,
  },
  dark: {
    text: NAV_THEME.dark.text,
    background: NAV_THEME.dark.background,
    tint: NAV_THEME.dark.primary,
    icon: NAV_THEME.dark.primary,
    tabIconDefault: NAV_THEME.dark.primary,
    tabIconSelected: NAV_THEME.dark.notification,
  },
};
