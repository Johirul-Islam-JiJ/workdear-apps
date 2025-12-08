import { ThemedView } from "@/components/libs/ThemedView";
import MyJobContent from "@/components/my-job/MyJobContent";
import React from "react";
import { ScrollView } from "react-native";

const MyJobs = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <MyJobContent />
      </ScrollView>
    </ThemedView>
  );
};

export default MyJobs;
