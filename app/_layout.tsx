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
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useColorScheme() ?? "light";
  const primaryDarker = useThemeColor("primarydarker");
  const primaryDark = useThemeColor("primarydark");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          style={theme === "dark" ? "light" : "dark"}
          backgroundColor={theme === "dark" ? primaryDarker : primaryDark}
          translucent={false}
        />
        <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
          <StoreProvider>
            <ScreenProvider />
            <ToastNotification />
          </StoreProvider>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
