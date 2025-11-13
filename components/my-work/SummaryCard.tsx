import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, ViewStyle } from "react-native";
import { ThemedText } from "../libs/ThemedText";

export interface SummaryCardProps {
  label: string;
  value: number;
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
    borderWidth: 1,
    borderColor: `${mainColor}50`,
    ...style,
  };

  return (
    <View style={containerStyle}>
      <ThemedText color={color} style={{ fontWeight: "bold" }}>
        {label}
      </ThemedText>
      <ThemedText color={color} variant="body2">
        {startContent}
        {Number(value).toLocaleString("en-US")}
        <ThemedText color={color} variant="body">
          {endContent}
        </ThemedText>
      </ThemedText>
    </View>
  );
};

export default SummaryCard;
