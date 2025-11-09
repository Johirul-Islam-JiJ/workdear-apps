import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View } from "react-native";
import DrawerFooter from "./drawer/DrawerFooter";
import DrawerMenus from "./drawer/DrawerMenus";
import DrawerProfile from "./drawer/DrawerProfile";

function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      style={style.container}
      contentContainerStyle={style.contentContainer}
    >
      <View>
        <DrawerProfile navigation={props.navigation} />
        <DrawerMenus navigation={props.navigation} />
      </View>
      <DrawerFooter />
    </DrawerContentScrollView>
  );
}

const style = StyleSheet.create({
  contentContainer: {
    paddingTop: 0,
    paddingStart: 0,
    paddingEnd: 0,
    paddingBottom: 20,
    justifyContent: "space-between",
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default DrawerContent;
