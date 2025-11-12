import Rating from "@/components/libs/Rating";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { config } from "@/config/config";
import { User } from "@/types/User";
import { Image } from "expo-image";
import React from "react";
import { View, ViewStyle } from "react-native";

const JobProviderInfoCard = ({ provider }: { provider: User }) => {
  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 25,
  };

  const pointIconStyle: ViewStyle = {
    position: "absolute",
    right: 8,
    top: 5,
    height: 15,
    width: 15,
    borderRadius: 50,
  };

  const source = provider?.profile_image
    ? { uri: config.fileBaseUrl + provider.profile_image }
    : require("@/assets/images/default.png");

  return (
    <ThemedView color="card" style={containerStyle}>
      <View style={{ position: "relative" }}>
        <Image
          source={source}
          style={{ height: 80, width: 80, borderRadius: 50 }}
        />
        {parseInt(provider.active) && (
          <ThemedView color="success" style={pointIconStyle} />
        )}
      </View>
      <View>
        <ThemedText variant="body" style={{ fontWeight: "bold" }}>
          {provider.name}
        </ThemedText>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Rating value={provider.user_rating.star_rating} size={18} />
          <ThemedText>({provider.user_rating.star_count})</ThemedText>
        </View>
        <ThemedText variant="small">
          Since{" "}
          {new Date(provider.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default JobProviderInfoCard;
