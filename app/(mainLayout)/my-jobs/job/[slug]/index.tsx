import { ThemedText } from "@/components/libs/ThemedText";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const MyjosDetails = () => {
  const { slug } = useLocalSearchParams();
  return (
    <View>
      <ThemedText>MyjosDetails {slug}</ThemedText>
    </View>
  );
};

export default MyjosDetails;
