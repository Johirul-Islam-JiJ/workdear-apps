import { ThemedText } from "@/components/libs/ThemedText";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const JobDetails = () => {
  const { slug } = useLocalSearchParams();

  return (
    <View>
      <ThemedText>JobDetails ID: {slug}</ThemedText>
    </View>
  );
};

export default JobDetails;
