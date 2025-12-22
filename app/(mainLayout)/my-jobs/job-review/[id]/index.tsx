import { ThemedView } from "@/components/libs/ThemedView";
import JobReviewContent from "@/components/my-job/job-review/JobReviewContent";
import React from "react";
import { ScrollView } from "react-native";

const JobReview = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <JobReviewContent />
      </ScrollView>
    </ThemedView>
  );
};

export default JobReview;
