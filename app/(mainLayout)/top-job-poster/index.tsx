import { ThemedView } from "@/components/libs/ThemedView";
import TopJobPosterContent from "@/components/top-ranking/TopJobPosterContent";
import React from "react";
import { ScrollView } from "react-native";

const TopJobPoster = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TopJobPosterContent />
      </ScrollView>
    </ThemedView>
  );
};

export default TopJobPoster;
