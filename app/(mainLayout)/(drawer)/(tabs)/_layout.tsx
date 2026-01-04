import { tabScreens } from "@/_mock/screens";
import ScreenHeader from "@/components/common/ScreenHeader";
import { ThemedView } from "@/components/libs/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const tabActiveColor = useThemeColor("primarydark");
  const tabBarBackgroundColor = useThemeColor("card");
  const whiteColor = useThemeColor("white");
  const blackColor = useThemeColor("black");
  const grayColor = useThemeColor("gray.700");
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const frame = useSafeAreaInsets();

  return (
    <ThemedView color="card" style={{ flex: 1, paddingBottom: frame.bottom }}>
      <ThemedView
        style={{ height: frame.top - 15 }}
        color="primarydark"
        darkColor="primarydarker"
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: tabActiveColor,
          tabBarInactiveTintColor: dark ? whiteColor : grayColor,
          tabBarStyle: {
            height: 55,
            paddingBottom: 0,
            marginBottom: 0,
            backgroundColor: tabBarBackgroundColor,
            shadowColor: "transparent",
          },
          header: (props) => (
            <ScreenHeader route={props.options.title as string} />
          ),
        }}
      >
        {tabScreens.map((screen) => (
          <Tabs.Screen
            key={screen.id}
            name={screen.name}
            options={{
              title: screen.title,
              tabBarIcon: ({ color }) => <screen.Icon color={color} />,
            }}
          />
        ))}
      </Tabs>
    </ThemedView>
  );
}
