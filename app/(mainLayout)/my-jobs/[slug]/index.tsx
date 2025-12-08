import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

const MyjobDetails = () => {
  const { slug } = useLocalSearchParams();
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ThemedText>slug: {slug}</ThemedText>
      </ScrollView>
    </ThemedView>
  );
};

export default MyjobDetails;
