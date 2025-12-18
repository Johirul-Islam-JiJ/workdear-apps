import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { useJobbyidQuery } from "@/store/features/jobs";
import { Job } from "@/types/Job";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";
import JobBasicInfo from "./JobBasicInfo";

const JobDetailsContent = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = useJobbyidQuery(slug);
  const job: Job = data?.data ?? {};

  if (isLoading)
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );
  return (
    <View style={{ rowGap: 10, padding: 10 }}>
      <JobBasicInfo job={job} />
    </View>
  );
};

export default JobDetailsContent;
