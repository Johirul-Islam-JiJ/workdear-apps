import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Badge from "../libs/Badge";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import { CategoryInfo, getRankColor } from "./ranking.config";

type Props = {
  category: CategoryInfo;
  rank: number;
};

const RankingCard = ({ category, rank }: Props) => {
  const hasRank = rank > 0;
  const rankColor = getRankColor(rank);

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <ThemedView
          color={hasRank ? "primarydark" : "gray.300"}
          style={styles.iconCircle}
        >
          <AppIcon color="white" size={22}>
            {category.icon}
          </AppIcon>
        </ThemedView>
        <Badge
          label={category.badgeLabel}
          color="primarydark"
          variant="soft"
          size="small"
        />
      </View>

      <ThemedText variant="small" color="gray.500" numberOfLines={1}>
        {category.label}
      </ThemedText>

      <View style={styles.rankRow}>
        {hasRank ? (
          <>
            <ThemedText variant="h2" color={rankColor}>
              #{rank}
            </ThemedText>
            {rank <= 3 && (
              <AppIcon color={rankColor} size={20}>
                <Ionicons name="trophy" />
              </AppIcon>
            )}
          </>
        ) : (
          <ThemedText variant="body" color="gray.400">
            Unranked
          </ThemedText>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "47%",
    flexGrow: 1,
    gap: 8,
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
});

export default RankingCard;
