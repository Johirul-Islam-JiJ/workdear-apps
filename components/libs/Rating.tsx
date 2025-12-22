import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, View, ViewStyle } from "react-native";
import AppIcon from "./AppIcon";
import { ThemedText } from "./ThemedText";

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  ratingInfo?: string;
  editable?: boolean;
  onChange?: (newValue: number) => void;
}

const Rating = ({
  value,
  max = 5,
  size = 20,
  ratingInfo,
  editable = false,
  onChange,
}: RatingProps) => {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    const isFull = i <= Math.floor(value);
    const isHalf = !isFull && i - value <= 0.5;

    const iconName = isFull ? "star" : isHalf ? "star-half-full" : "star-o";

    const handlePress = () => {
      if (editable && onChange) {
        onChange(i);
      }
    };

    stars.push(
      <Pressable
        key={i}
        onPress={handlePress}
        disabled={!editable}
        style={{ opacity: editable ? 1 : 0.8 }}
      >
        <AppIcon size={size} color={isFull || isHalf ? "warning" : "gray.500"}>
          <FontAwesome name={iconName} />
        </AppIcon>
      </Pressable>
    );
  }

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
  };

  return (
    <View style={containerStyle}>
      {stars}
      <ThemedText variant="small">{ratingInfo}</ThemedText>
    </View>
  );
};

export default Rating;
