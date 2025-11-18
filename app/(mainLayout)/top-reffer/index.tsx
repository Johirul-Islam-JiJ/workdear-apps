import { ThemedView } from "@/components/libs/ThemedView";
import TopReffererContent from "@/components/top-ranking/TopReffererContent";
import React from "react";
import { ScrollView } from "react-native";

const TopRefferer = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TopReffererContent />
      </ScrollView>
    </ThemedView>
  );
};

export default TopRefferer;
