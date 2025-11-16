import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";

// ----------------- drawer screens -----------------------
export const drawerScreens = {
  home: {
    name: "(tabs)",
    drawerLabel: "Home",
  },
  verify: {
    name: "verification/index",
    drawerLabel: "Verify now",
  },
  profile: {
    name: "user-profile/index",
    drawerLabel: "My profile",
  },
  myJobs: {
    name: "my-jobs/index",
    drawerLabel: "My jobs",
  },
  ticket: {
    name: "ticket/index",
    drawerLabel: "Ticket",
  },
  advertisement: {
    name: "advertisement/index",
    drawerLabel: "Advertisement",
  },
  deposit: {
    name: "deposit/index",
    drawerLabel: "Deposit",
  },
  wallet: {
    name: "wallet/index",
    drawerLabel: "Wallet",
  },
  history: {
    name: "transaction-history/index",
    drawerLabel: "Transaction history",
  },
};

export type TabScreen = {
  id: number;
  name: string;
  title: string;
  Icon: ({ color }: { color: string }) => React.JSX.Element | null;
  href?: null;
  tabBarStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

export const tabScreens: TabScreen[] = [
  {
    id: 1,
    name: "index",
    title: "Home",
    Icon: ({ color }: { color: string }) => (
      <Entypo name="home" size={24} color={color} />
    ),
  },
  {
    id: 2,
    name: "jobs/index",
    title: "Find Job",
    Icon: ({ color }: { color: string }) => (
      <MaterialCommunityIcons
        name="credit-card-search"
        size={26}
        color={color}
      />
    ),
  },
  {
    id: 3,
    name: "post-job/index",
    title: "Post Job",
    Icon: ({ color }: { color: string }) => (
      <Entypo name="circle-with-plus" size={30} color={color} />
    ),
  },
  {
    id: 4,
    name: "my-work/index",
    title: "My Work",
    Icon: ({ color }: { color: string }) => (
      <FontAwesome name="list-alt" size={24} color={color} />
    ),
  },
  {
    id: 5,
    name: "more/index",
    title: "More",
    Icon: ({ color }: { color: string }) => (
      <MaterialIcons name="more" size={24} color={color} />
    ),
  },
  {
    id: 6,
    name: "jobs/[slug]/index",
    title: "Job information",
    Icon: () => null,
    href: null,
    tabBarStyle: { display: "none" },
  },
  {
    id: 7,
    name: "my-work/[id]/index",
    title: "Task information",
    Icon: () => null,
    href: null,
    tabBarStyle: { display: "none" },
  },
  {
    id: 8,
    name: "jobs/details/[slug]/index",
    title: "Job details",
    Icon: () => null,
    href: null,
    tabBarStyle: { display: "none" },
  },
];
