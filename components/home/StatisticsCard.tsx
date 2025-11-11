import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { useColorScheme } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import { HeroDataType } from "./Statistics";

const StatisticsCard = ({ item }: { item: HeroDataType }) => {
  const colorScheme = useColorScheme() ?? "light";
  const dark = colorScheme === "dark";
  const iconColor = useThemeColor(dark ? "white" : "primarydark");
  const { title, Icon, number } = item;

  return (
    <ThemedView
      color="card"
      style={{
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 18,
        justifyContent: "center",
        alignItems: "center",
        width: "48.5%",
      }}
    >
      <Icon color={iconColor} width={50} height={50} />
      <ThemedText variant="subtitle" style={{ marginTop: 10, marginBottom: 5 }}>
        {Number(number).toLocaleString("en-US")}
      </ThemedText>
      <ThemedText variant="bodySemiBold">{title}</ThemedText>
    </ThemedView>
  );
};

export default StatisticsCard;
