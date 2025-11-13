import React from "react";
import { View, ViewStyle } from "react-native";
import Skeleton from "../../libs/Skeleton";
import { ThemedView } from "../../libs/ThemedView";

const PackageLoadingCard = () => {
  const container: ViewStyle = {
    paddingVertical: 15,
    paddingHorizontal: 12,
    gap: 15,
    borderRadius: 10,
  };

  return (
    <ThemedView color="card" style={container}>
      <Skeleton height={30} width={150} style={{ alignSelf: "center" }} />
      <Skeleton height={10} width={200} style={{ alignSelf: "center" }} />

      <View style={{ gap: 8 }}>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </View>

      <Skeleton height={30} />
    </ThemedView>
  );
};

export default PackageLoadingCard;
