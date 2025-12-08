import React from "react";
import { View } from "react-native";
import { ThemedView } from "../libs/ThemedView";
import NavBar from "./NavBar";

const ScreenHeader = ({
  route,
  openDrawer = true,
}: {
  route: string;
  openDrawer?: boolean;
}) => {
  return (
    <View>
      <ThemedView
        color="primarydark"
        darkColor="primarydarker"
        style={{ height: 30 }}
      />
      <NavBar route={route} openDrawer={openDrawer} />
    </View>
  );
};

export default ScreenHeader;
