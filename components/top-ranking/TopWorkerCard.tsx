import { ColorScheme } from "@/constants/Colors";
import { TopWorker } from "@/types/top-ranking";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import AppIcon from "../libs/AppIcon";
import Card from "../libs/Card";
import Rating from "../libs/Rating";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const TopWorkerCard = ({
  item,
  rank,
  work,
  Icon,
}: {
  item: TopWorker;
  rank: number;
  work: string | number;
  Icon: React.JSX.Element;
}) => {
  const iconWrapper: ViewStyle = {
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  };
  const ratingWrapper: ViewStyle = {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  };

  const color: ColorScheme =
    rank === 1
      ? "warning"
      : rank === 2
      ? "silvar"
      : rank === 3
      ? "orange"
      : "primarydark";

  return (
    <Card style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <ThemedView color={color} style={iconWrapper}>
        <ThemedText variant="subtitle" color="white">
          {rank}
        </ThemedText>
      </ThemedView>
      <View style={{ flex: 1 }}>
        <ThemedText>{item.user.name}</ThemedText>
        <View style={ratingWrapper}>
          <Rating
            value={item.user.user_rating.star_rating}
            ratingInfo={`(${item.user.user_rating.star_provider_count})`}
          />
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <AppIcon color="primarydark" size={18}>
              {Icon}
            </AppIcon>
            <ThemedText style={{ fontWeight: "bold" }} color="primarydark">
              {work}
            </ThemedText>
          </View>
        </View>
      </View>
      {rank < 4 && (
        <AppIcon color={color}>
          <Ionicons name="trophy" />
        </AppIcon>
      )}
    </Card>
  );
};

export default TopWorkerCard;
