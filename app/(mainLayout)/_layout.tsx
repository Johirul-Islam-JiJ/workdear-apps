import DrawerContent from "@/components/common/DrawerContent";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{ headerShown: false, drawerHideStatusBarOnOpen: true }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
