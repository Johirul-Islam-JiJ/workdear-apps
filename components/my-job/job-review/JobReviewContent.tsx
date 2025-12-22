import Card from "@/components/libs/Card";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { useGetSingleTaskByIdQuery } from "@/store/features/jobSubmission";
import { JobSubmission } from "@/types/submission";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";
import ActionButons from "./ActionButons";
import ProofImage from "./ProofImage";
import RateWorker from "./RateWorker";
import VarificationQuestion from "./VarificationQuestion";

const JobReviewContent = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetSingleTaskByIdQuery(id);
  const submission: JobSubmission = data?.data;

  if (isLoading)
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );

  return (
    <View style={{ padding: 10, rowGap: 10 }}>
      <ThemedText variant="subtitle">Review the submission</ThemedText>
      <ProofImage images={submission.job_submission_image} />
      <Card>
        <ThemedText variant="bodySemiBold">Proof Text</ThemedText>
        <ThemedView color="border" style={{ padding: 10, borderRadius: 10 }}>
          <ThemedText variant="body2">{submission.proof_data}</ThemedText>
        </ThemedView>
      </Card>
      <RateWorker taskId={submission.id} />
      <VarificationQuestion submission={submission} />
      <ActionButons
        taskId={submission.id}
        status={submission.status}
        jobSlug={submission.job.slug}
        jobId={submission.job.id}
      />
    </View>
  );
};

export default JobReviewContent;
