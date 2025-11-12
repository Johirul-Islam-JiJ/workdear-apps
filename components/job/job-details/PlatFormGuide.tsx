import IconButton from "@/components/libs/IconButton";
import { ThemedText } from "@/components/libs/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, ViewStyle } from "react-native";

const PlatFormGuide = () => {
  const warningColor = useThemeColor("warning");

  const containerStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: warningColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  };

  return (
    <View style={containerStyle}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <IconButton icon="alert" color="warning" size="sm" />
        <ThemedText color="warning" style={{ fontWeight: "bold" }}>
          Platform Guidelines
        </ThemedText>
      </View>
      <ThemedText darkColor="white">
        Work Dear maintains a{" "}
        <ThemedText color="warning">responsible platform policy</ThemedText>.
        Gambling, betting, and wagering activities are strictly prohibited.
        Please ensure all tasks comply with our community guidelines and legal
        requirements.
      </ThemedText>
    </View>
  );
};

export default PlatFormGuide;
