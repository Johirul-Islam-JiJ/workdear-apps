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

const PinnedModal = ({ visible, setVisible }: Props) => {
  const { handlePin, isPinningJob } = useMyJobsData();
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

  const pinCost = useGetCostFromCostCenter(CostName.PIN);
  const minutes = watch("minutes") ?? "0";

  const onSubmit = (data: any) => {
    handlePin({
      minutes: Number(data.minutes),
      id: visible,
      cb: () => setVisible(0),
    });
  };

  return (
    <Modal visible={visible} setVisible={setVisible} style={{ rowGap: 15 }}>
      <View>
        <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
          Pin Your Job
        </ThemedText>
        <ThemedText color="warning" style={{ textAlign: "center" }}>
          The estimated pin cost per minute ${pinCost}
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
        Your estimed pin cost: ${(pinCost * Number(minutes)).toFixed(4)}
      </ThemedText>
      <Button
        loading={isPinningJob}
        title="Pin Job"
        onPress={handleSubmit(onSubmit)}
      />
    </Modal>
  );
};

export default PinnedModal;
