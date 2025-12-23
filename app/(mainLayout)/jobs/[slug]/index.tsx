import HeaderPart from "@/components/job/job-details/HeaderPart";
import JobDetailsBody from "@/components/job/job-details/JobDetailsBody";
import JobSubmissionForm from "@/components/job/job-details/JobSubmissionForm";
import PlatFormGuide from "@/components/job/job-details/PlatFormGuide";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedView } from "@/components/libs/ThemedView";
import { useJobbyidQuery } from "@/store/features/jobs";
import { Job } from "@/types/Job";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

const JobDetails = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = useJobbyidQuery(slug);
  const job: Job = data?.data ?? {};

  if (isLoading) return <LoadingIndicator fullScreen />;

  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ gap: 10, padding: 10 }}>
            <HeaderPart job={job} />
            <PlatFormGuide />
            <JobDetailsBody job={job} />
            <JobSubmissionForm job={job} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default JobDetails;
