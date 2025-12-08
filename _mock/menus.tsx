import { ColorScheme } from "@/constants/Colors";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { drawerScreens, stackScreens } from "./screens";

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
  {
    label: drawerScreens.settings.drawerLabel,
    path: drawerScreens.settings.name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="settings-outline" size={size} color={color} />
    ),
  },
];

export type MoreMenu = {
  label: string;
  path: string;
  external?: boolean;
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
    title: "Earn  and Withdraw",
    color: "success",
    Icon: ({ color, size }) => (
      <Ionicons name="cash-outline" size={size} color={color} />
    ),
    menus: [
      {
        label: stackScreens.shareAndEarn.drawerLabel,
        path: stackScreens.shareAndEarn.name,
        Icon: ({ color, size }) => (
          <Ionicons name="share-social-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.playandearn.drawerLabel,
        path: stackScreens.playandearn.name,
        Icon: ({ color, size }) => (
          <Ionicons name="game-controller-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.wallet.drawerLabel,
        path: stackScreens.wallet.name,
        Icon: ({ color, size }) => (
          <Ionicons name="wallet-outline" size={size} color={color} />
        ),
      },
    ],
  },
  {
    title: "Achievements & Rankings",
    color: "warning",
    Icon: ({ color, size }) => (
      <Ionicons name="trophy-outline" size={size} color={color} />
    ),
    menus: [
      {
        label: stackScreens.topWorkers.drawerLabel,
        path: stackScreens.topWorkers.name,
        Icon: ({ color, size }) => (
          <Ionicons name="people-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.topJobPoster.drawerLabel,
        path: stackScreens.topJobPoster.name,
        Icon: ({ color, size }) => (
          <Ionicons name="briefcase-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.topReffer.drawerLabel,
        path: stackScreens.topReffer.name,
        Icon: ({ color, size }) => (
          <Ionicons name="share-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.topUsers.drawerLabel,
        path: stackScreens.topUsers.name,
        Icon: ({ color, size }) => (
          <Ionicons name="star-outline" size={size} color={color} />
        ),
      },
    ],
  },
  {
    title: "Settings & Preferences",
    color: "primarydark",
    Icon: ({ color, size }) => (
      <Ionicons name="settings-outline" size={size} color={color} />
    ),
    menus: [
      {
        label: stackScreens.notification.drawerLabel,
        path: stackScreens.notification.name,
        Icon: ({ color, size }) => (
          <Ionicons name="notifications-outline" size={size} color={color} />
        ),
      },
    ],
  },
  {
    title: "Help & Information",
    color: "info",
    Icon: ({ color, size }) => (
      <Ionicons name="help-circle-outline" size={size} color={color} />
    ),
    menus: [
      {
        label: stackScreens.aboutUs.drawerLabel,
        path: stackScreens.aboutUs.name,
        Icon: ({ color, size }) => (
          <Ionicons
            name="information-circle-outline"
            size={size}
            color={color}
          />
        ),
      },
      {
        label: stackScreens.faq.drawerLabel,
        path: stackScreens.faq.name,
        Icon: ({ color, size }) => (
          <Ionicons name="help-buoy-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.contactUs.drawerLabel,
        path: stackScreens.contactUs.name,
        Icon: ({ color, size }) => (
          <Ionicons name="call-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.blogs.drawerLabel,
        path: stackScreens.blogs.name,
        Icon: ({ color, size }) => (
          <Ionicons name="newspaper-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.chat.drawerLabel,
        path: stackScreens.contactUs.name,
        Icon: ({ color, size }) => (
          <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
        ),
      },
      {
        label: "Join Telegram",
        path: "https://t.me/joinchat/AAAAAEc-5_45Y095",
        external: true,
        Icon: ({ color, size }) => (
          <FontAwesome5 name="telegram-plane" size={size} color={color} />
        ),
      },
    ],
  },
  {
    title: "Legal & Policies",
    color: "info",
    Icon: ({ color, size }) => (
      <MaterialIcons name="policy" size={size} color={color} />
    ),
    menus: [
      {
        label: stackScreens.termsAndConditions.drawerLabel,
        path: stackScreens.termsAndConditions.name,
        Icon: ({ color, size }) => (
          <Ionicons name="document-text-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.privacyPolicy.drawerLabel,
        path: stackScreens.privacyPolicy.name,
        Icon: ({ color, size }) => (
          <Ionicons name="lock-closed-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.refundPolicy.drawerLabel,
        path: stackScreens.refundPolicy.name,
        Icon: ({ color, size }) => (
          <Ionicons name="receipt-outline" size={size} color={color} />
        ),
      },
      {
        label: stackScreens.cancelationPolicy.drawerLabel,
        path: stackScreens.cancelationPolicy.name,
        Icon: ({ color, size }) => (
          <Ionicons name="close-circle-outline" size={size} color={color} />
        ),
      },
    ],
  },
];
