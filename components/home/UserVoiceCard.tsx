import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import Rating from "../libs/Rating";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import { UserReview } from "./Testimonials";

const UserVoiceCard = ({ item }: { item: UserReview }) => {
  const borderColor = useThemeColor("primarydark");

  const profileStyle = {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: borderColor,
  };

  return (
    <ThemedView
      color="card"
      style={{ borderRadius: 10, padding: 15, rowGap: 8 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Image source={item.image} style={profileStyle} contentFit="cover" />
          <View>
            <ThemedText
              style={{ fontWeight: "bold", fontSize: 18 }}
              color="primarydark"
              darkColor="white"
            >
              {item.name}
            </ThemedText>
            <ThemedText color="gray.700" darkColor="gray.300">
              {item.title}
            </ThemedText>
          </View>
        </View>
        <Rating value={item.rating} size={20} />
      </View>
      <ThemedText>{item.quote}</ThemedText>
    </ThemedView>
  );
};

export default UserVoiceCard;
