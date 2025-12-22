import JobReport from "@/components/job/common/JobReport";
import Button from "@/components/libs/Button";
import { ThemedText } from "@/components/libs/ThemedText";
import useJobReview from "@/hooks/useJobReview";
import { useToast } from "@/hooks/useToast";
import { TaskStatus } from "@/types/myJobs";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import GiveTips from "./GiveTips";

type Props = {
  taskId: number;
  status: TaskStatus;
  jobSlug: string;
  jobId: number;
};

const ActionButons = ({ taskId, status, jobSlug, jobId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState("");
  const { satisfySingle, unSatisfySingle } = useJobReview();
  enum Satisfaction {
    Satisfied = "Satisfied",
    UnSatisfied = "UnSatisfied",
  }
  const toast = useToast();
  const router = useRouter();

  const handleTaskReview = async (type: Satisfaction) => {
    try {
      setIsSubmitting(type);
      if (type === Satisfaction.Satisfied) {
        await satisfySingle({ job_submission_id: taskId });
      } else {
        await unSatisfySingle({ job_submission_id: taskId });
      }

      toast.success("Task Reviewed Successfully");
      router.push(`/(mainLayout)/my-jobs/${jobSlug}?jobId=${jobId}`);
    } catch (err) {
      toast.error("Failed to Review Task");
    } finally {
      setIsSubmitting("");
    }
  };

  if (status === TaskStatus.SATISFIED) {
    return (
      <ThemedText
        variant="body2"
        color="success"
        style={{ textAlign: "center", marginBottom: 10 }}
      >
        Task already Satisfied
      </ThemedText>
    );
  } else if (status === TaskStatus.UNSATISFIED) {
    return (
      <ThemedText
        variant="body2"
        color="error"
        style={{ textAlign: "center", marginBottom: 10 }}
      >
        Task already UnSatisfied
      </ThemedText>
    );
  }

  return (
    <View style={{ rowGap: 10, marginBottom: 10 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button
          onPress={() => handleTaskReview(Satisfaction.Satisfied)}
          loading={isSubmitting === Satisfaction.Satisfied}
          color="success"
          title="Satisfied"
          style={{ flex: 1 }}
          startIcon="happy"
        />
        <Button
          onPress={() => handleTaskReview(Satisfaction.UnSatisfied)}
          loading={isSubmitting === Satisfaction.UnSatisfied}
          color="error"
          title="Unsatisfied"
          style={{ flex: 1 }}
          startIcon="close"
        />
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <JobReport
          jobId={null}
          submissionId={taskId}
          title="Submit a report agains this worker"
          type="job_submission"
          style={{ flex: 1 }}
        />
        <GiveTips taskId={taskId} />
      </View>
    </View>
  );
};

export default ActionButons;
