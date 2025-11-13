import IconButton from "@/components/libs/IconButton";
import { ThemedText } from "@/components/libs/ThemedText";
import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, ViewStyle } from "react-native";

export interface JobSummaryCardProps {
  label: string;
  Icon: React.ReactNode;
  value: string | number;
  color: ColorScheme;
  style?: ViewStyle;
}

const JobReportCard = ({
  label,
  Icon,
  value,
  color,
  style = {},
}: JobSummaryCardProps) => {
  const mainColor = useThemeColor(color);
  const backgroundColor = `${mainColor}20`;

  const containerStyle: ViewStyle = {
    backgroundColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    ...style,
  };

  return (
    <View style={containerStyle}>
      <IconButton icon={Icon} color={color} variant="solid" />
      <View>
        <ThemedText color={color}>{label}</ThemedText>
        <ThemedText variant="body2">{value}</ThemedText>
      </View>
    </View>
  );
};

export default JobReportCard;
