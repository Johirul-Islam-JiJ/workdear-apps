import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { View } from "react-native";

const loading = () => {
  return (
    <View style={{ flex: 1 }}>
      <ThemedView color="primaryDarker" style={{ height: 35 }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText type="subtitle">Loading...</ThemedText>
      </View>
    </View>
  );
};

export default loading;
