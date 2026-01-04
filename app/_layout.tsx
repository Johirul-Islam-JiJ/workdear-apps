import ToastNotification from "@/components/libs/ToastNotification";
import { useThemeColor } from "@/hooks/useThemeColor";
import ScreenProvider from "@/providers/ScreenProvider";
import StoreProvider from "@/providers/StoreProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar, useColorScheme } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useColorScheme() ?? "light";
  const primaryDarker = useThemeColor("primarydarker");
  const primaryDark = useThemeColor("primarydark");

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={theme === "dark" ? primaryDarker : primaryDark}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        translucent={false}
      />
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        <StoreProvider>
          <ScreenProvider />
          <ToastNotification />
        </StoreProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
