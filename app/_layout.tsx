import ToastNotification from "@/components/libs/ToastNotification";
import { useColorScheme } from "@/hooks/useColorScheme";
import ScreenProvider from "@/providers/ScreenProvider";
import StoreProvider from "@/providers/StoreProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StoreProvider>
        <ScreenProvider />
        <ToastNotification />
        <StatusBar style="light" />
      </StoreProvider>
    </ThemeProvider>
  );
}
