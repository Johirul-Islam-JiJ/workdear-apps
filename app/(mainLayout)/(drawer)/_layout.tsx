import { drawerScreens } from "@/_mock/screens";
import DrawerContent from "@/components/common/DrawerContent";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerHideStatusBarOnOpen: false,
          header: (props) => {
            const lebel = props.options.drawerLabel as string;
            if (props.route.name === "(tabs)") return null;
            return <ScreenHeader route={lebel} />;
          },
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        {Object.entries(drawerScreens).map(([id, { name, drawerLabel }]) => (
          <Drawer.Screen
            key={id}
            name={name}
            options={{ drawerLabel: drawerLabel }}
          />
        ))}
      </Drawer>
    </GestureHandlerRootView>
  );
}
