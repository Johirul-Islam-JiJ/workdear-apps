import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const drawerScreens = [
  {
    id: 1,
    name: "(tabs)",
    drawerLabel: "Home",
  },
  {
    id: 2,
    name: "verification",
    drawerLabel: "Verify now",
  },
  {
    id: 3,
    name: "user-profile",
    drawerLabel: "My profile",
  },
  {
    id: 4,
    name: "ticket",
    drawerLabel: "Ticket",
  },
  {
    id: 5,
    name: "deposit",
    drawerLabel: "Deposit",
  },
  {
    id: 6,
    name: "wallet",
    drawerLabel: "Wallet",
  },
  {
    id: 7,
    name: "transaction-history",
    drawerLabel: "Transaction history",
  },
  {
    id: 8,
    name: "live-support",
    drawerLabel: "Live support",
  },
];

export const tabScreens = [
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
    name: "jobs",
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
    name: "postJob",
    title: "Post Job",
    Icon: ({ color }: { color: string }) => (
      <Entypo name="circle-with-plus" size={30} color={color} />
    ),
  },
  {
    id: 4,
    name: "myWork",
    title: "My Work",
    Icon: ({ color }: { color: string }) => (
      <FontAwesome name="list-alt" size={24} color={color} />
    ),
  },
  {
    id: 5,
    name: "more",
    title: "More",
    Icon: ({ color }: { color: string }) => (
      <MaterialIcons name="more" size={24} color={color} />
    ),
  },
];
