import Button from "@/components/libs/Button";
import Input from "@/components/libs/Input";
import Modal from "@/components/libs/Modal";
import { ThemedText } from "@/components/libs/ThemedText";
import { useToast } from "@/hooks/useToast";
import { useGiveTipsMutation } from "@/store/features/jobSubmission";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const GiveTips = ({ taskId }: { taskId: number }) => {
  const [open, setOpen] = useState(0);
  const [giveTips, { isLoading }] = useGiveTipsMutation();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = async (payload: any) => {
    try {
      payload.job_submission_id = taskId;

      await giveTips(payload);
      toast.success("Tips sent successfully");
      reset();
      setOpen(0);
    } catch (err) {
      toast.error("Failed to send tips");
    }
  };
  return (
    <>
      <Button
        onPress={() => setOpen(1)}
        color="success"
        title="Give tips"
        style={{ flex: 1 }}
        startIcon="happy"
      />
      <Modal visible={open} setVisible={setOpen} style={{ rowGap: 10 }}>
        <ThemedText variant="subtitle">Give tips to the worker</ThemedText>
        <Controller
          name="amount"
          control={control}
          rules={{ required: "Amount is required" }}
          render={({ field }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter amount"
              error={errors.amount?.message}
            />
          )}
        />
        <Button
          style={{ marginTop: 10 }}
          onPress={handleSubmit(onSubmit)}
          title="Give Tips"
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default GiveTips;
