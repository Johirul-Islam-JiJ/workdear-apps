import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { View } from "react-native";

const loading = () => {
  return (
    <View style={{ flex: 1 }}>
      <ThemedView color="primarydark" style={{ height: 35 }} />
      <LoadingIndicator fullScreen />
    </View>
  );
};

export default loading;
