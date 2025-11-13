import { ThemedText } from "@/components/libs/ThemedText";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const MyWorkDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <ThemedText>My work details ID: {id}</ThemedText>
    </View>
  );
};

export default MyWorkDetails;
