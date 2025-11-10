import { tabScreens } from "@/_mock/screens";
import ScreenHeader from "@/components/common/ScreenHeader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import React from "react";
import { Animated, Platform, StyleProp, ViewStyle } from "react-native";

export default function TabLayout() {
  const tabActiveColor = useThemeColor("primarydark");
  const tabBarStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> =
    Platform.select({
      ios: {
        position: "absolute",
      },
      default: {},
    });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabActiveColor,
        tabBarStyle: tabBarStyle,
        header: ScreenHeader,
      }}
    >
      {tabScreens.map(({ id, name, title, Icon }) => (
        <Tabs.Screen
          key={id}
          name={name}
          options={{
            title: title,
            tabBarIcon: ({ color }) => <Icon color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
