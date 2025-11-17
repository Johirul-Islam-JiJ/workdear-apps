import { ThemedView } from "@/components/libs/ThemedView";
import TopWorkerContent from "@/components/top-ranking/TopWorkerContent";
import React from "react";
import { ScrollView } from "react-native";

const TopWorker = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TopWorkerContent />
      </ScrollView>
    </ThemedView>
  );
};

export default TopWorker;
