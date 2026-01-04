import { tabScreens } from "@/_mock/screens";
import ScreenHeader from "@/components/common/ScreenHeader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const tabActiveColor = useThemeColor("primarydark");
  const tabBarBackgroundColor = useThemeColor("card");
  const whiteColor = useThemeColor("white");
  const grayColor = useThemeColor("gray.700");
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";
  return (
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
  );
}
