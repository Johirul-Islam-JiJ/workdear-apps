import HeaderPart from "@/components/job/job-details/HeaderPart";
import JobDetailsBody from "@/components/job/job-details/JobDetailsBody";
import PlatFormGuide from "@/components/job/job-details/PlatFormGuide";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedView } from "@/components/libs/ThemedView";
import { useJobbyidQuery } from "@/store/features/jobs";
import { Job } from "@/types/Job";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, ViewStyle } from "react-native";

const JobDetails = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = useJobbyidQuery(slug);
  const job: Job = data?.data ?? {};

  if (isLoading) return <LoadingIndicator fullScreen />;

  const containerStyle: ViewStyle = {
    rowGap: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flex: 1,
  };
  return (
    <ScrollView>
      <ThemedView color="background" style={containerStyle}>
        <HeaderPart job={job} />
        <PlatFormGuide />
        <JobDetailsBody job={job} />
      </ThemedView>
    </ScrollView>
  );
};

export default JobDetails;
