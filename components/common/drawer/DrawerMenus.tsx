import { drawerMenus } from "@/_mock/menus";
import Button from "@/components/libs/Button";
import IconButton from "@/components/libs/IconButton";
import { useAppSelector } from "@/hooks/redux";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View } from "react-native";

interface DrawerQuickActionsProps {
  navigation: DrawerContentComponentProps["navigation"];
}

export default function DrawerMenus({ navigation }: DrawerQuickActionsProps) {
  const { user } = useAppSelector((state) => state.user);
  const isVerified = user?.is_verified;

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
            startIcon={<IconButton icon={menu.icon} size="md" color="black" />}
            style={{ justifyContent: "space-between" }}
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
