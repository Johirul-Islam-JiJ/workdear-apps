import React from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import Divider from "../libs/Divider";
import { ThemedText } from "../libs/ThemedText";

const PlayAndEarnContent = () => {
  return (
    <View style={{ padding: 10 }}>
      <Card>
        <View style={{ rowGap: 5 }}>
          <ThemedText variant="body2">Play and Earn</ThemedText>
          <Divider />
        </View>
      </Card>
    </View>
  );
};

export default PlayAndEarnContent;
