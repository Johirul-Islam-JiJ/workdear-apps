import { ThemedView } from "@/components/libs/ThemedView";
import TopUserContent from "@/components/top-ranking/TopUserContent";
import React from "react";
import { ScrollView } from "react-native";

const TopUser = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TopUserContent />
      </ScrollView>
    </ThemedView>
  );
};

export default TopUser;
