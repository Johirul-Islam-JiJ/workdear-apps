import { useGetSingleTaskByIdQuery } from "@/store/features/jobSubmission";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const JobReviewContent = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetSingleTaskByIdQuery(id);
  return <View></View>;
};

export default JobReviewContent;
