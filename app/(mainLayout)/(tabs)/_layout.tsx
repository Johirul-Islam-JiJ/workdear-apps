import { tabScreens } from "@/_mock/screens";
import ScreenHeader from "@/components/common/ScreenHeader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import React from "react";
import {
  Animated,
  Platform,
  StyleProp,
  useColorScheme,
  ViewStyle,
} from "react-native";

export default function TabLayout() {
  const tabActiveColor = useThemeColor("primarydark");
  const tabBarBackgroundColor = useThemeColor("card");
  const whiteColor = useThemeColor("white");
  const blackColor = useThemeColor("black");
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  const tabBarStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> =
    Platform.select({
      ios: {
        position: "absolute",
        backgroundColor: tabBarBackgroundColor,
        shadowColor: dark ? whiteColor : blackColor,
      },
      default: {
        backgroundColor: tabBarBackgroundColor,
        shadowColor: dark ? whiteColor : blackColor,
      },
    });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabActiveColor,
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
            href: screen.href,
            tabBarStyle: screen.tabBarStyle ? screen.tabBarStyle : tabBarStyle,
          }}
        />
      ))}
    </Tabs>
  );
}
