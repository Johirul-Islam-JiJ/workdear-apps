import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const NavBar = () => {
  const navigation = useNavigation();

  function openDrawer() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  return (
    <ThemedView color="primaryDark" style={styles.navBar}>
      <Pressable onPress={openDrawer}>
        <FontAwesome6 name="bars" size={24} color="white" />
      </Pressable>
      <View style={styles.balanceContainer}>
        <ThemedView color="primaryDarker" style={styles.balance}>
          <ThemedText color="white" type="defaultSemiBold">
            $9800.9999
          </ThemedText>
        </ThemedView>
        <ThemedView color="primaryLight" style={styles.balance}>
          <ThemedText color="white" type="defaultSemiBold">
            $9800.9999
          </ThemedText>
        </ThemedView>
        <View style={{ position: "relative" }}>
          <Ionicons name="notifications-sharp" size={24} color="yellow" />
          <ThemedView color="primaryLight" style={styles.notification} />
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  navBar: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  balance: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  notification: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 100,
  },
});

export default NavBar;
