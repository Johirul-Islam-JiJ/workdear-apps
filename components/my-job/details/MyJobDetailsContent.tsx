import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { useJobbyidQuery } from "@/store/features/jobs";
import { Job } from "@/types/Job";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const MyJobDetailsContent = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = useJobbyidQuery(slug);
  const job: Job = data?.data ?? {};

  if (isLoading) return <LoadingIndicator fullScreen />;

  console.log(job);

  return <View></View>;
};

export default MyJobDetailsContent;
