import { config } from "@/config/config";
import { useAppSelector } from "@/hooks/redux";
import { useGetNotificationCountQuery } from "@/store/features/notification";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { DrawerActions } from "@react-navigation/native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedView } from "../libs/ThemedView";

const NavBar = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: notificationCount } = useGetNotificationCountQuery();
  const navigation = useNavigation();

  function openDrawer() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  const source = user?.profile_image
    ? { uri: config.fileBaseUrl + user.profile_image }
    : require("@/assets/images/default.png");
  return (
    <ThemedView color="primarydark" style={styles.navBar}>
      <Pressable onPress={openDrawer}>
        <FontAwesome6 name="bars" size={22} color="white" />
      </Pressable>

      <View style={styles.wrapper}>
        <View style={{ position: "relative" }}>
          <Ionicons name="notifications-sharp" size={24} color="white" />
          {notificationCount && notificationCount?.data.unread_count > 0 && (
            <ThemedView color="primarylight" style={styles.notification} />
          )}
        </View>
        <Image style={styles.profile} contentFit="contain" source={source} />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  navBar: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
  },
  wrapper: { flexDirection: "row", alignItems: "center", gap: 10 },
  notification: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  profile: { height: 30, width: 30, borderRadius: 50 },
});

export default NavBar;
