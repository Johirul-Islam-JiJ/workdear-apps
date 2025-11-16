import { ColorScheme } from "@/constants/Colors";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { drawerScreens } from "./screens";

export const drawerMenus = [
  {
    label: drawerScreens.verify.drawerLabel,
    path: drawerScreens.verify.name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="checkmark-circle-outline" size={size} color={color} />
    ),
    hideOnVerified: true,
  },
  {
    label: drawerScreens.profile.drawerLabel,
    path: drawerScreens.profile.name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <FontAwesome name="user-o" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens.myJobs.drawerLabel,
    path: drawerScreens.myJobs.name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <MaterialIcons name="work-outline" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens.ticket.drawerLabel,
    path: drawerScreens.ticket.name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="ticket-outline" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens.advertisement.drawerLabel,
    path: drawerScreens.advertisement.name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Entypo name="modern-mic" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens.deposit.drawerLabel,
    path: drawerScreens.deposit.name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="cash-outline" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens.history.drawerLabel,
    path: drawerScreens.history.name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="receipt-outline" size={size} color={color} />
    ),
  },
];

export type MoreMenu = {
  label: string;
  path: string;
  Icon: ({ color, size }: { color: string; size: number }) => React.JSX.Element;
};

export type MoreMenusContent = {
  title: string;
  color: ColorScheme;
  Icon: ({ color, size }: { color: string; size: number }) => React.JSX.Element;
  menus: MoreMenu[];
};

export const moreMenus: MoreMenusContent[] = [
  {
    title: "Achievements & Rankings",
    color: "warning",
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="trophy-outline" size={size} color={color} />
    ),
    menus: [
      {
        label: drawerScreens.topWorkers.drawerLabel,
        path: drawerScreens.topWorkers.name,
        Icon: ({ color, size }: { color: string; size: number }) => (
          <Ionicons name="trophy-outline" size={size} color={color} />
        ),
      },
      {
        label: drawerScreens.topJobPoster.drawerLabel,
        path: drawerScreens.topJobPoster.name,
        Icon: ({ color, size }: { color: string; size: number }) => (
          <Ionicons name="trophy-outline" size={size} color={color} />
        ),
      },
      {
        label: drawerScreens.topReffer.drawerLabel,
        path: drawerScreens.topReffer.name,
        Icon: ({ color, size }: { color: string; size: number }) => (
          <Ionicons name="trophy-outline" size={size} color={color} />
        ),
      },
      {
        label: drawerScreens.topUsers.drawerLabel,
        path: drawerScreens.topUsers.name,
        Icon: ({ color, size }: { color: string; size: number }) => (
          <Ionicons name="trophy-outline" size={size} color={color} />
        ),
      },
    ],
  },
];
