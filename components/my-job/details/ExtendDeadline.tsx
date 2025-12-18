import Button from "@/components/libs/Button";
import Input from "@/components/libs/Input";
import Modal from "@/components/libs/Modal";
import { ThemedText } from "@/components/libs/ThemedText";
import useJobReview from "@/hooks/useJobReview";
import { useToast } from "@/hooks/useToast";
import { useExpiredJobExtendMutation } from "@/store/features/jobs";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

const ExtendDeadline = () => {
  const { basicJobInfo: jobData } = useJobReview();
  const [showExtendModal, setShowExtendDeadlineModal] = useState(0);
  const [extendDeadline, { isLoading }] = useExpiredJobExtendMutation();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      extend_days: "32",
    },
  });

  async function onsubmit(data: any) {
    try {
      const payload = {
        job_id: jobData.id,
        extend_days: data.extend_days,
      };
      await extendDeadline(payload).unwrap();
      toast.success("Deadline extended successfully");
      setShowExtendDeadlineModal(0);
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  }

  const requiredWorker = jobData?.total_worker_required;
  const totalSatified = jobData?.total_satisfied_count;

  if (jobData?.job_status === "EXPIRED" && requiredWorker !== totalSatified) {
    return (
      <>
        <Button
          onPress={() => setShowExtendDeadlineModal(1)}
          style={{ flex: 1 }}
          title="Extend Deadline"
        />

        <Modal
          visible={showExtendModal}
          setVisible={setShowExtendDeadlineModal}
          style={{ rowGap: 15 }}
        >
          <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
            Extend Deadline
          </ThemedText>

          <View>
            <ThemedText>Extend days</ThemedText>
            <Controller
              control={control}
              name="extend_days"
              rules={{ required: "Extend days is required" }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="numeric"
                  placeholder="Enter extend days"
                  error={errors.extend_days?.message}
                />
              )}
            />
          </View>

          <Button
            loading={isLoading}
            onPress={handleSubmit(onsubmit)}
            title="Submit"
          />
        </Modal>
      </>
    );
  } else return null;
};

export default ExtendDeadline;
