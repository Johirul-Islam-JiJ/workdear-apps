import Container from "@/components/common/Container";
import ProviderInfo from "@/components/job/job-details/ProviderInfo";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import JobInfoCard from "@/components/my-work/work-details/JobInfoCard";
import { useJobbyidQuery } from "@/store/features/jobs";
import { Job } from "@/types/Job";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const JobDetails = () => {
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = useJobbyidQuery(slug);
  const job: Job = data?.data ?? {};

  if (isLoading) return <LoadingIndicator fullScreen />;

  return (
    <Container rowGap={20}>
      <JobInfoCard job={job} />
      <ProviderInfo provider={job.provider} />
    </Container>
  );
};

export default JobDetails;
