import HeaderPart from "@/components/job/job-details/HeaderPart";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
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
    <View style={{ rowGap: 20, paddingHorizontal: 10, paddingVertical: 15 }}>
      <HeaderPart job={job} />
    </View>
  );
};

export default JobDetails;
