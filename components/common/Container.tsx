import React from "react";
import { ScrollView, View } from "react-native";
import { ThemedView } from "../libs/ThemedView";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10, gap: 10 }}>{children}</View>
      </ScrollView>
    </ThemedView>
  );
};

export default Container;
