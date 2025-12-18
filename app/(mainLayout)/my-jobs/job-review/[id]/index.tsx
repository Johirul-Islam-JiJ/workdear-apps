import { ThemedText } from "@/components/libs/ThemedText";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const JobReview = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <ThemedText>Job Review {id}</ThemedText>
    </View>
  );
};

export default JobReview;
