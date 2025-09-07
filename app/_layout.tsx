import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontLoaded] = useFonts({
    RobotoCondensedExtraLight: require("../assets/fonts/RobotoCondensed-ExtraLight.ttf"),
    RobotoCondensedLight: require("../assets/fonts/RobotoCondensed-Light.ttf"),
    RobotoCondensedMedium: require("../assets/fonts/RobotoCondensed-Medium.ttf"),
    RobotoCondensedRegular: require("../assets/fonts/RobotoCondensed-Regular.ttf"),
    RobotoCondensedSemiBold: require("../assets/fonts/RobotoCondensed-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hide();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
