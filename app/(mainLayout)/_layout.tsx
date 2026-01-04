import { stackScreens } from "@/_mock/screens";
import ScreenHeader from "@/components/common/ScreenHeader";
import { ThemedView } from "@/components/libs/ThemedView";
import { Stack } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MainLayout = () => {
  const frame = useSafeAreaInsets();

  return (
    <>
      <ThemedView
        style={{ height: frame.top - 8 }}
        color="primarydark"
        darkColor="primarydarker"
      />

      <Stack
        screenOptions={{
          header: (props) => {
            if (props.route.name === "(drawer)") return null;
            return (
              <ScreenHeader
                route={props.options.title as string}
                openDrawer={false}
              />
            );
          },
        }}
      >
        {Object.entries(stackScreens).map(([id, { name, title }]) => (
          <Stack.Screen key={id} name={name} options={{ title: title }} />
        ))}
      </Stack>
      <ThemedView style={{ height: frame.bottom - 8 }} color="card" />
    </>
  );
};

export default MainLayout;
