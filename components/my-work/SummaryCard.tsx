import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, ViewStyle } from "react-native";
import { ThemedText } from "../libs/ThemedText";

export interface SummaryCardProps {
  label: string;
  value: number | string;
  startContent?: string;
  endContent?: string;
  color: ColorScheme;
  style?: ViewStyle;
}

const SummaryCard = (props: SummaryCardProps) => {
  const { label, value, startContent, endContent, color, style = {} } = props;
  const mainColor = useThemeColor(color);
  const backgroundColor = `${mainColor}20`;

  const containerStyle: ViewStyle = {
    backgroundColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 10,
    ...style,
  };

  return (
    <View style={containerStyle}>
      <ThemedText color={color} style={{ fontWeight: "bold" }}>
        {label}
      </ThemedText>
      <ThemedText color={color} variant="body2">
        {startContent}
        {typeof value === "number"
          ? Number(value).toLocaleString("en-US")
          : value}
        <ThemedText color={color} variant="body">
          {endContent}
        </ThemedText>
      </ThemedText>
    </View>
  );
};

export default SummaryCard;
