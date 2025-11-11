import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import AppIcon from "./AppIcon";

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
}

const Rating = ({ value, max = 5, size = 20 }: RatingProps) => {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(value)) {
      // full star
      stars.push(
        <AppIcon key={i} size={size} color="warning">
          <FontAwesome name="star" />
        </AppIcon>
      );
    } else if (i - value <= 0.5) {
      // half star
      stars.push(
        <AppIcon key={i} size={size} color="warning">
          <FontAwesome name="star-half-full" />
        </AppIcon>
      );
    } else {
      // empty star
      stars.push(
        <AppIcon key={i} size={size} color="gray.500">
          <FontAwesome name="star-o" />
        </AppIcon>
      );
    }
  }

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
  };

  return <View style={containerStyle}>{stars}</View>;
};

export default Rating;
