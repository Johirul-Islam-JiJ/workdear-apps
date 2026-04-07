import { useGetProfileRankingQuery } from "@/store/features/auth";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import { ThemedText } from "../libs/ThemedText";
import RankingCard from "./RankingCard";
import { categories, PositionData } from "./ranking.config";

const RankingPresenter = () => {
  const { data, isLoading } = useGetProfileRankingQuery(undefined);
  const positions: PositionData = data?.data?.positions || {};

  if (isLoading) {
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        My Rankings
      </ThemedText>

      <View style={styles.grid}>
        {categories.map((cat) => (
          <RankingCard
            key={cat.key}
            category={cat}
            rank={positions[cat.key] ?? 0}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});

export default RankingPresenter;
