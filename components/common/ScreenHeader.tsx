import React from "react";
import { View } from "react-native";
import { ThemedView } from "../libs/ThemedView";
import NavBar from "./NavBar";

const ScreenHeader = () => {
  return (
    <View>
      <ThemedView
        color="primarydark"
        darkColor="primarydarker"
        style={{ height: 30 }}
      />
      <NavBar />
    </View>
  );
};

export default ScreenHeader;
