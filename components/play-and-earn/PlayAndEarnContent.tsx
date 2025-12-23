import React from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import Divider from "../libs/Divider";
import { ThemedText } from "../libs/ThemedText";
import SpinnerWheel from "./SpinnerWheel";

const PlayAndEarnContent = () => {
  return (
    <Card>
      <View style={{ rowGap: 5 }}>
        <ThemedText variant="body2">Play and Earn</ThemedText>
        <Divider />
      </View>
      <SpinnerWheel />
    </Card>
  );
};

export default PlayAndEarnContent;
