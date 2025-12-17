import { ThemedView } from "@/components/libs/ThemedView";
import MyJobDetailsContent from "@/components/my-job/details/MyJobDetailsContent";
import React from "react";
import { ScrollView } from "react-native";

const MyJobDetails = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <MyJobDetailsContent />
      </ScrollView>
    </ThemedView>
  );
};

export default MyJobDetails;
