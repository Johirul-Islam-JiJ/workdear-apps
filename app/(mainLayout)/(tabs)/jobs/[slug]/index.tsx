import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedText } from "@/components/libs/ThemedText";
import { useJobbyidQuery } from "@/store/features/jobs";
import { Job } from "@/types/Job";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const JobDetails = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = useJobbyidQuery(slug);
  const job: Job = data?.data ?? {};

  if (isLoading) return <LoadingIndicator fullScreen />;

  return (
    <View>
      <ThemedText>JobDetails ID: {slug}</ThemedText>
    </View>
  );
};

export default JobDetails;
