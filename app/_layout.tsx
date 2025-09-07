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
    RobotoSerifExtraLight: require("../assets/fonts/RobotoSerif_28pt-ExtraLight.ttf"),
    RobotoSerifLight: require("../assets/fonts/RobotoSerif_28pt-Light.ttf"),
    RobotoSerifSemiBold: require("../assets/fonts/RobotoSerif_28pt-Medium.ttf"),
    RobotoSerifRegular: require("../assets/fonts/RobotoSerif_28pt-Regular.ttf"),
    RobotoSerifBold: require("../assets/fonts/RobotoSerif_28pt-Bold.ttf"),
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
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
