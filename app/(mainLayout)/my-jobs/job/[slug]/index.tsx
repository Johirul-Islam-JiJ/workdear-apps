import { ThemedView } from "@/components/libs/ThemedView";
import JobDetailsContent from "@/components/my-job/job-details/JobDetailsContent";
import React from "react";
import { ScrollView } from "react-native";

const MyjosDetails = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <JobDetailsContent />
      </ScrollView>
    </ThemedView>
  );
};

export default MyjosDetails;
