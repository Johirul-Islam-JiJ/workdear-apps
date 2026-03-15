import { ThemedView } from "@/components/libs/ThemedView";
import RankingPresenter from "@/components/ranking/RankingPresenter";
import React from "react";
import { ScrollView } from "react-native";

const Ranking = () => {
  return (
    <ThemedView style={{ flex: 1 }} color="background">
      <ScrollView style={{ flex: 1 }}>
        <RankingPresenter />
      </ScrollView>
    </ThemedView>
  );
};

export default Ranking;
