import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { menus } from "./paths";
import { drawerScreens } from "./screens";

export const drawerMenus = [
  {
    label: drawerScreens[1].drawerLabel,
    path: drawerScreens[1].name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="checkmark-circle-outline" size={size} color={color} />
    ),
    hideOnVerified: true,
  },
  {
    label: drawerScreens[2].drawerLabel,
    path: drawerScreens[2].name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <FontAwesome name="user-o" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens[8].drawerLabel,
    path: drawerScreens[8].name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <MaterialIcons name="work-outline" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens[3].drawerLabel,
    path: drawerScreens[3].name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="ticket-outline" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens[4].drawerLabel,
    path: drawerScreens[4].name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="cash-outline" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens[5].drawerLabel,
    path: drawerScreens[5].name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="wallet-outline" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens[6].drawerLabel,
    path: drawerScreens[6].name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="receipt-outline" size={size} color={color} />
    ),
  },
  {
    label: drawerScreens[7].drawerLabel,
    path: drawerScreens[7].name,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
    ),
  },
];

export const dashboardMenuItems = [
  {
    label: "Premium",
    // icon: <IoStar />,
    path: menus.premium,
    hideOnVerified: false,
    disabledOnNotVerified: false,
    className: "step-purchase-package",
  },
  {
    label: "My Jobs",
    // icon: <MdOutlineWork />,
    path: menus.myJobs,
    hideOnVerified: false,
    disabledOnNotVerified: false,
    className: "step-my-job",
  },
  {
    label: "Notification",
    // icon: <IoMdNotifications />,
    path: menus.notification,
    hideOnVerified: false,
    disabledOnNotVerified: false,
    className: "step-notification",
  },

  {
    label: "Share & Earn",
    // icon: <IoShareSocial />,
    path: menus.shareAndEarn,
    hideOnVerified: false,
    disabledOnNotVerified: false,
    className: "step-share-earn",
  },
  {
    label: "Advertisement",
    // icon: <RiAdvertisementFill />,
    path: null,
    hideOnVerified: false,
    disabledOnNotVerified: false,
    className: "step-advertisement",
    subMenus: [
      {
        label: "Add new Ads",
        path: menus["add-new-ads"],
      },
      {
        label: "History",
        path: menus.history,
      },
    ],
  },

  {
    label: "Play & Earn ",
    // icon: <FaTrophy />,
    path: menus.playandearn,
    hideOnVerified: false,
    disabledOnNotVerified: false,
    className: "step-play-and-earn",
  },
  {
    // icon: GrUserWorker,
    label: "Top worker",
    path: menus.topWorkers,
    external: false,
  },
  {
    // icon: HiArrowTrendingUp,
    label: "Top job poster",
    path: menus.topJobPoster,
    external: false,
  },
  {
    // icon: HiArrowTrendingUp,
    label: "Top refer",
    path: menus.topReffer,
    external: false,
  },
  {
    // icon: PiUserCheckFill,
    label: "Top users",
    path: menus.bestUsers,
    external: false,
  },
];

export const deshboardFooterMenus = [
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
];

export const homeLayoutMenus = [
  { label: "Live support", href: "/live-support", loginRequired: false },
  { label: "Blogs", href: "/blogs", loginRequired: false },
  {
    label: "Sign In",
    href: "/signin",
    loginRequired: false,
    variant: "outline",
    type: "button",
  },
  {
    label: "Get Started",
    href: "/signup",
    loginRequired: false,
    variant: "contain",
    type: "button",
  },
  { label: "Home", href: "/", loginRequired: true },
  { label: "All Jobs", href: "/jobs", loginRequired: true },
  { label: "Blogs", href: "/blogs", loginRequired: true },
  { label: "Dashboard", href: "/user-profile", loginRequired: true },
];

export const footerMenus = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      ,
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Cancelation Policy", href: "/cancelation-policy" },
      { label: "Blogs", href: "/blogs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/live-support" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];
