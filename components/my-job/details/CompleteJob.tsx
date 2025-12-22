import Button from "@/components/libs/Button";
import Modal from "@/components/libs/Modal";
import { ThemedText } from "@/components/libs/ThemedText";
import useJobReview from "@/hooks/useJobReview";
import { useToast } from "@/hooks/useToast";
import { useMakeJobCompletedMutation } from "@/store/features/jobs";
import React, { useState } from "react";
import { View } from "react-native";

const CompleteJob = () => {
  const { basicJobInfo: jobData } = useJobReview();
  const [showCompleteJobModal, setShowCompleteJobModal] = useState(0);
  const [completeJob, { isLoading: completeJobLoading }] =
    useMakeJobCompletedMutation();
  const toast = useToast();

  async function handleJobComplete() {
    try {
      await completeJob({ id: jobData.id, status: "COMPLETED" }).unwrap();
      toast.success("Job Completed Successfully");
      setShowCompleteJobModal(0);
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  }

  const underRaview = parseInt(jobData?.remaining_review || "0");
  const satisfiedCount = jobData?.total_satisfied_count;
  const workedCount = jobData?.total_worker_required;
  const refundCount = workedCount - satisfiedCount;
  const refundAmount = refundCount * parseFloat(jobData?.pay_per_task || "0");
  const isAvailableToComplete = /EXPIRED|APPROVED/.test(jobData?.job_status);

  if (!jobData || !isAvailableToComplete) return null;
  return (
    <>
      <Button
        onPress={() => setShowCompleteJobModal(1)}
        style={{ width: "49%" }}
        title="Complete Job"
        color="success"
      />

      <Modal
        visible={showCompleteJobModal}
        setVisible={setShowCompleteJobModal}
        style={{ rowGap: 10 }}
      >
        <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
          Complete this job
        </ThemedText>

        <ThemedText color="warning">
          {underRaview > 0
            ? "You have some submissions under review. You cannot complete this job until all submissions are reviewed."
            : `Once completed, you will not be able to make any further changes to this job.
             `}
        </ThemedText>
        {!underRaview && refundAmount && (
          <ThemedText style={{ textAlign: "center" }}>
            You will be refunded ${refundAmount.toFixed(4)} for the
            {refundCount} tasks that were not satisfied/unsubmitted.
          </ThemedText>
        )}

        <View
          style={{ flexDirection: "row", justifyContent: "flex-end", gap: 10 }}
        >
          <Button
            variant="outlined"
            onPress={() => setShowCompleteJobModal(0)}
            title="No, Cancel"
          />
          <Button
            onPress={handleJobComplete}
            loading={completeJobLoading}
            disabled={underRaview > 0}
            title="Yes, Complete"
          />
        </View>
      </Modal>
    </>
  );
};

export default CompleteJob;
