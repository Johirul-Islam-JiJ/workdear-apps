import ProviderInfo from "@/components/job/job-details/ProviderInfo";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedView } from "@/components/libs/ThemedView";
import JobInfoCard from "@/components/my-work/work-details/JobInfoCard";
import { useJobbyidQuery } from "@/store/features/jobs";
import { Job } from "@/types/Job";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const JobDetails = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = useJobbyidQuery(slug);
  const job: Job = data?.data ?? {};

  if (isLoading) return <LoadingIndicator fullScreen />;

  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, rowGap: 20 }}>
          <JobInfoCard job={job} />
          <ProviderInfo provider={job.provider} />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default JobDetails;
