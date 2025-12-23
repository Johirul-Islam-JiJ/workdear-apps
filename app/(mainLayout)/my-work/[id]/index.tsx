import Container from "@/components/common/Container";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import JobInfoCard from "@/components/my-work/work-details/JobInfoCard";
import SubmissionInfo from "@/components/my-work/work-details/SubmissionInfo";
import { useGetTaskByIdQuery } from "@/store/features/my-work";
import { MyWorkDetils } from "@/types/myWork";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const MyWorkDetails = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetTaskByIdQuery(id);

  if (isLoading) return <LoadingIndicator fullScreen />;
  const task: MyWorkDetils = data?.data;

  return (
    <Container rowGap={20}>
      <SubmissionInfo data={task} />
      <JobInfoCard job={task.job} />
    </Container>
  );
};

export default MyWorkDetails;
