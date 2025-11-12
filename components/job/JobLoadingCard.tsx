import React from "react";
import { View, ViewStyle } from "react-native";
import Skeleton from "../libs/Skeleton";
import { ThemedView } from "../libs/ThemedView";

const JobLoadingCard = () => {
  const container: ViewStyle = {
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };

  return (
    <ThemedView color="card" style={container}>
      <View style={{ gap: 7 }}>
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: "78%", gap: 7 }}>
          <View style={{ alignItems: "center" }}>
            <Skeleton width="30%" />
          </View>
          <Skeleton />
        </View>
        <View style={{ width: "20%", gap: 7 }}>
          <Skeleton />
          <Skeleton />
        </View>
      </View>
    </ThemedView>
  );
};

export default JobLoadingCard;
