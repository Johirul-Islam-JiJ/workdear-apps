import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { useMyJobsData } from "@/hooks/useMyJobsData";
import { CostName } from "@/types/CostCenter";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import Button from "../libs/Button";
import Input from "../libs/Input";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
};

const BoostModal = ({ visible, setVisible }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minutes: "",
    },
  });
  const { handleBoost, isBoostingJob } = useMyJobsData();
  const boostCost = useGetCostFromCostCenter(CostName.BOOST);
  const minutes = watch("minutes") ?? "0";

  const onSubmit = (data: any) => {
    handleBoost({
      minutes: Number(data.minutes),
      jobId: visible,
      cb: () => setVisible(0),
    });
  };

  return (
    <Modal visible={visible} setVisible={setVisible} style={{ rowGap: 15 }}>
      <View>
        <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
          Boost your job
        </ThemedText>
        <ThemedText color="warning" style={{ textAlign: "center" }}>
          The estimated boost cost per minute ${boostCost}
        </ThemedText>
      </View>

      <View>
        <ThemedText>Duration in minutes</ThemedText>
        <Controller
          rules={{ required: "Duration is required" }}
          control={control}
          name="minutes"
          render={({ field }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              keyboardType="numeric"
              placeholder="Enter duration in minutes"
              error={errors.minutes?.message}
            />
          )}
        />
      </View>
      <ThemedText>
        Your estimed boosting cost: ${(boostCost * Number(minutes)).toFixed(4)}
      </ThemedText>
      <Button
        loading={isBoostingJob}
        title="Boost"
        onPress={handleSubmit(onSubmit)}
      />
    </Modal>
  );
};

export default BoostModal;
