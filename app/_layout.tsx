import ToastNotification from "@/components/libs/ToastNotification";
import ScreenProvider from "@/providers/ScreenProvider";
import StoreProvider from "@/providers/StoreProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useColorScheme() ?? "light";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        <StoreProvider>
          <ScreenProvider />
          <ToastNotification />
          <StatusBar style="light" />
        </StoreProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
}
