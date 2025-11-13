import Button from "@/components/libs/Button";
import Input from "@/components/libs/Input";
import Modal from "@/components/libs/Modal";
import { ThemedText } from "@/components/libs/ThemedText";
import { useToast } from "@/hooks/useToast";
import {
  useReportJobMutation,
  useReportSubmissionMutation,
} from "@/store/features/jobs";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, ViewStyle } from "react-native";

interface JobReportProps {
  jobId: number | null;
  submissionId: number | null;
  type: "job" | "job_submission";
  title: string;
  style?: ViewStyle;
  buttonSize?: "small" | "medium" | "large";
}

const JobReport = ({
  jobId,
  submissionId,
  type,
  title,
  style,
  buttonSize,
}: JobReportProps) => {
  const [reportJob, { isLoading }] = useReportJobMutation();
  const [showModal, setShowModal] = useState(0);
  const toast = useToast();
  const [reportSubmission, { isLoading: reportSubmissionLoading }] =
    useReportSubmissionMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      job_id: jobId,
      job_submission_id: submissionId,
      reason: "",
      type: type,
    },
  });

  async function onSubmit(data: any) {
    try {
      if (type === "job") {
        await reportJob(data).unwrap();
      } else {
        await reportSubmission(data).unwrap();
      }
      toast.success("Report submitted successfully");
      setShowModal(0);
    } catch (error: any) {
      toast.error(error.data.message || "Internal server error");
    }
  }

  return (
    <>
      <Button
        onPress={() => setShowModal(1)}
        title="Report"
        color="warning"
        style={style}
        startIcon="flag"
        size={buttonSize}
      />
      {!!showModal && (
        <Modal
          visible={showModal}
          setVisible={setShowModal}
          style={{ rowGap: 10 }}
        >
          <ThemedText variant="body2" color="primarydark" darkColor="white">
            {title}
          </ThemedText>

          <View>
            <ThemedText>Report reason</ThemedText>
            <Controller
              name="reason"
              control={control}
              rules={{ required: "Reason is required" }}
              render={({ field }) => (
                <Input
                  placeholder="Enter the reason"
                  value={field.value}
                  onChangeText={field.onChange}
                  multiline
                  numberOfLines={5}
                  error={errors.reason?.message}
                />
              )}
            />
          </View>
          <Button
            loading={isLoading || reportSubmissionLoading}
            onPress={handleSubmit(onSubmit)}
            title="Submit"
            style={{ marginTop: 10 }}
          />
        </Modal>
      )}
    </>
  );
};

export default JobReport;
