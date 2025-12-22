import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import Input from "@/components/libs/Input";
import Rating from "@/components/libs/Rating";
import { ThemedText } from "@/components/libs/ThemedText";
import { useToast } from "@/hooks/useToast";
import { useGiveRatingToWorkerMutation } from "@/store/features/jobSubmission";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const RateWorker = ({ taskId }: { taskId: number }) => {
  const [rateWorker, { isLoading }] = useGiveRatingToWorkerMutation();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: "",
      star_reason: "",
    },
  });
  const toast = useToast();

  async function onSubmit(payload: any) {
    try {
      payload.job_submission_id = taskId;

      await rateWorker(payload).unwrap();
      toast.success("Rating sent successfully");
      reset();
    } catch (error: any) {
      toast.error(error.data?.message || "Internal Server Error");
    }
  }

  return (
    <Card>
      <ThemedText variant="bodySemiBold">Rate this proof</ThemedText>
      <Controller
        control={control}
        name="rating"
        rules={{ required: "Rating is required" }}
        render={({ field: { onChange, value } }) => (
          <Rating value={parseInt(value ?? "0")} onChange={onChange} editable />
        )}
      />

      <Controller
        control={control}
        name="star_reason"
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="Feedback or comment (optional)"
            numberOfLines={5}
            style={{ height: "auto" }}
            multiline
          />
        )}
      />
      <Button
        style={{ marginTop: 10, alignSelf: "flex-end" }}
        title="Send"
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
      />
    </Card>
  );
};

export default RateWorker;
