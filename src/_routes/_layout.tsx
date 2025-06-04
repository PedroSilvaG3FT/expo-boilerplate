import { PUBLIC_ROUTES } from "@/_shared/constants/public-routes";
import "../../global.css";

import AppLoading from "@/_shared/design/components/loading";
import { NAV_THEME } from "@/_shared/design/lib/constants";
import { useColorScheme } from "@/_shared/design/lib/useColorScheme";
import { WrapperProvider } from "@/contexts/wrapper.context";
import authStore from "@/store/auth.store";
import uiStore from "@/store/ui.store";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Redirect, Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();
const DARK_THEME: Theme = { ...DarkTheme, colors: NAV_THEME.dark };
const LIGHT_THEME: Theme = { ...DefaultTheme, colors: NAV_THEME.light };

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const hasMounted = useRef(false);
  const pathname = usePathname();

  const _uiStore = uiStore((state) => state);
  const _authStore = authStore((state) => state);

  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  const [loaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setColorScheme(_uiStore.theme);
  }, [_uiStore.theme]);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) return;

    if (Platform.OS === "web")
      document.documentElement.classList.add("bg-background");

    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!loaded || !isColorSchemeLoaded) return null;

  if (!_authStore.token && !PUBLIC_ROUTES.includes(pathname))
    return <Redirect href="/(auth)/sign-in" />;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <WrapperProvider>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

            <View
              className={isDarkColorScheme ? "dark font-sans" : "font-sans"}
              style={{
                flex: 1,
                backgroundColor: isDarkColorScheme
                  ? NAV_THEME.dark.background
                  : NAV_THEME.light.background,
              }}
            >
              <Stack>
                <Stack.Screen name="(main)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>

              <PortalHost />
              <AppLoading />
            </View>
          </WrapperProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? useEffect
    : useLayoutEffect;
