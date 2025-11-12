import { ThemedText } from "@/components/libs/ThemedText";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const JobDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <ThemedText>JobDetails ID: {id}</ThemedText>
    </View>
  );
};

export default JobDetails;
