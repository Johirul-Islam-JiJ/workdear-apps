import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

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
  history: {
    name: "transaction-history/index",
    drawerLabel: "Transaction history",
  },
  settings: {
    name: "settings/index",
    drawerLabel: "Settings",
  },
  myJobs: {
    name: "my-jobs/index",
    drawerLabel: "My jobs",
  },
};

export const stackScreens = {
  // -------------------- more screens -----------------------

  // achivement and ranking screens
  topWorkers: {
    name: "top-workers/index",
    drawerLabel: "Top workers",
  },
  topJobPoster: {
    name: "top-job-poster/index",
    drawerLabel: "Top job poster",
  },
  topReffer: {
    name: "top-reffer/index",
    drawerLabel: "Top reffer",
  },
  topUsers: {
    name: "top-users/index",
    drawerLabel: "Best users",
  },

  // earn and withdraw screens
  shareAndEarn: {
    name: "share-and-earn/index",
    drawerLabel: "Share and Earn",
  },
  playandearn: {
    name: "play-and-earn/index",
    drawerLabel: "Play and Earn",
  },
  wallet: {
    name: "wallet/index",
    drawerLabel: "Withdraw",
  },

  // settings and preference screen
  notification: {
    name: "notification/index",
    drawerLabel: "Notification",
  },

  // help and support screen
  aboutUs: {
    name: "about-us/index",
    drawerLabel: "About us",
  },
  faq: {
    name: "faq/index",
    drawerLabel: "FAQ",
  },
  blogs: {
    name: "blogs/index",
    drawerLabel: "Blogs",
  },
  singleBlog: {
    name: "blogs/[slug]/index",
    drawerLabel: "Blog details",
  },
  contactUs: {
    name: "contact-us/index",
    drawerLabel: "Contact us",
  },
  chat: {
    name: "contact-us/chat/index",
    drawerLabel: "Live Chat",
  },

  // Legal and policies screen
  termsAndConditions: {
    name: "terms-and-conditions/index",
    drawerLabel: "Terms and conditions",
  },
  privacyPolicy: {
    name: "privacy-policy/index",
    drawerLabel: "Privacy policy",
  },
  refundPolicy: {
    name: "refund-policy/index",
    drawerLabel: "Refund policy",
  },
  cancelationPolicy: {
    name: "cancelation-policy/index",
    drawerLabel: "Cancelation policy",
  },
};

export type TabScreen = {
  id: number;
  name: string;
  title: string;
  Icon: ({ color }: { color: string }) => React.JSX.Element | null;
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
];
