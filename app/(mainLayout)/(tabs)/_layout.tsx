import NavBar from "@/components/common/NavBar";
import { ThemedView } from "@/components/libs/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const tabActiveColor = useThemeColor("primarydark");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabActiveColor,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
        header: () => (
          <>
            <ThemedView color="primarydark" style={{ height: 35 }} />
            <NavBar />
          </>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Find Job",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="credit-card-search"
              size={26}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="postJob"
        options={{
          title: "Post Job",
          tabBarIcon: ({ color }) => (
            <Entypo name="circle-with-plus" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="myWork"
        options={{
          title: "My Work",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="more" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
