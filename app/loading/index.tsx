import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { View } from "react-native";

const loading = () => {
  return (
    <View style={{ flex: 1 }}>
      <ThemedView color="primarydark" style={{ height: 35 }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText variant="subtitle">Loading...</ThemedText>
      </View>
    </View>
  );
};

export default loading;
