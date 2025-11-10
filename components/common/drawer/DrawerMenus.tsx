import { drawerMenus } from "@/_mock/menus";
import Button from "@/components/libs/Button";
import { useAppSelector } from "@/hooks/redux";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View } from "react-native";

interface DrawerQuickActionsProps {
  navigation: DrawerContentComponentProps["navigation"];
}

export default function DrawerMenus({ navigation }: DrawerQuickActionsProps) {
  const { user } = useAppSelector((state) => state.user);
  const isVerified = user?.is_verified;

  const extraMenus = [
    {
      label: "Join Telegram",
      path: "https://t.me/joinchat/AAAAAEc-5_45Y095",
      icon: "logo-tableau",
      external: true,
    },
  ];

  return (
    <View style={style.quickActionsSection}>
      {drawerMenus.map((menu, index) => {
        if (menu.hideOnVerified && isVerified) return null;
        return (
          <Button
            key={index}
            title={menu.label}
            endIcon="chevron-forward"
            variant="text"
            color="black"
            startIcon={<Ionicons name={menu.icon} size={24} color="black" />}
            style={{ justifyContent: "space-between" }}
            onPress={() => navigation.navigate(menu.path)}
          />
        );
      })}
    </View>
  );
}

const style = StyleSheet.create({
  quickActionsSection: {
    paddingHorizontal: 10,
    paddingTop: 16,
    gap: 8,
  },
});
