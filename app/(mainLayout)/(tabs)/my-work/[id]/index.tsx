import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedView } from "@/components/libs/ThemedView";
import JobInfoCard from "@/components/my-work/work-details/JobInfoCard";
import SubmissionInfo from "@/components/my-work/work-details/SubmissionInfo";
import { useGetTaskByIdQuery } from "@/store/features/my-work";
import { MyWorkDetils } from "@/types/myWork";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const MyWorkDetails = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetTaskByIdQuery(id);

  if (isLoading) return <LoadingIndicator fullScreen />;
  const task: MyWorkDetils = data?.data;

  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, rowGap: 20 }}>
          <SubmissionInfo data={task} />
          <JobInfoCard job={task.job} />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default MyWorkDetails;
