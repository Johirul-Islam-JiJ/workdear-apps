import { drawerMenus } from "@/_mock/menus";
import Button from "@/components/libs/Button";
import { ExternalLink } from "@/components/libs/ExternalLink";
import ThemeSwitch from "@/components/libs/ThemeSwitch";
import { ThemedText } from "@/components/libs/ThemedText";
import { useAppSelector } from "@/hooks/redux";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

interface DrawerQuickActionsProps {
  navigation: DrawerContentComponentProps["navigation"];
}

export default function DrawerMenus({ navigation }: DrawerQuickActionsProps) {
  const { user } = useAppSelector((state) => state.user);
  const isVerified = user?.is_verified;
  const darkColor = useThemeColor("primarydarker");
  const theme = useColorScheme() ?? "light";
  const textColor = useThemeColor("text");
  const backgroundColor = useThemeColor("background");

  return (
    <View style={[style.quickActionsSection, { backgroundColor }]}>
      <View style={{ gap: 8 }}>
        {drawerMenus.map(({ hideOnVerified, Icon, label, path }, index) => {
          if (hideOnVerified && isVerified) return null;
          return (
            <Button
              key={index}
              title={label}
              endIcon="chevron-forward"
              variant="text"
              color="text"
              startIcon={<Icon size={24} color={textColor} />}
              style={{ justifyContent: "space-between" }}
              onPress={() => navigation.navigate(path)}
            />
          );
        })}
      </View>

      <View style={{ gap: 8 }}>
        <ExternalLink href="https://t.me/joinchat/AAAAAEc-5_45Y095">
          <View style={style.telegram}>
            <View style={style.linkLabel}>
              <FontAwesome5 name="telegram-plane" size={22} color={textColor} />
              <ThemedText color="text" variant="button">
                Join telegram
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={textColor} />
          </View>
        </ExternalLink>
        <Button
          title="Theme mode"
          endIcon={<ThemeSwitch />}
          variant="text"
          color="text"
          startIcon={
            theme === "dark" ? (
              <Entypo name="light-down" size={26} color="white" />
            ) : (
              <MaterialIcons name="dark-mode" size={20} color={darkColor} />
            )
          }
          style={{ justifyContent: "space-between" }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  quickActionsSection: {
    paddingVertical: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  telegram: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  linkLabel: { flexDirection: "row", alignItems: "center", gap: 10 },
});
