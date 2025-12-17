import { useMyJobsData } from "@/hooks/useMyJobsData";
import { MyJob } from "@/types/myJobs";
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
  job: MyJob;
};

const EditModal = ({ visible, setVisible, job }: Props) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      worker_quantity: "",
      day_extend: "",
    },
  });

  const { handleUpdateJob, isUpdatingJob } = useMyJobsData();
  const costPerWorker = job.pay_per_task;
  const totalWorker = watch("worker_quantity") || 0;

  function onSubmit(data: any) {
    handleUpdateJob({
      payload: {
        job_id: job.id,
        worker_quantity: data.worker_quantity
          ? Number(data.worker_quantity)
          : null,
        day_extend: data.day_extend ? Number(data.day_extend) : null,
      },
      cb: () => {
        setVisible(0);
        reset();
      },
    });
  }

  const extendVales = [100, 200, 500];

  return (
    <Modal visible={visible} setVisible={setVisible} style={{ rowGap: 15 }}>
      <View>
        <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
          Extend Your Job
        </ThemedText>
        <ThemedText color="warning" style={{ textAlign: "center" }}>
          Cost per worker: ${costPerWorker}
        </ThemedText>
      </View>
      <View>
        <ThemedText>Extend worker</ThemedText>
        <Controller
          control={control}
          name="worker_quantity"
          render={({ field }) => (
            <Input
              placeholder="Enter number of worker"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.worker_quantity?.message}
              keyboardType="numeric"
            />
          )}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          {extendVales.map((item, index) => (
            <Button
              key={index}
              variant="outlined"
              size="small"
              title={`+ ${item}`}
              onPress={() =>
                setValue(
                  "worker_quantity",
                  (Number(totalWorker) + item).toString()
                )
              }
            />
          ))}
        </View>
      </View>
      <View>
        <ThemedText>Extended Days</ThemedText>
        <Controller
          control={control}
          name="day_extend"
          render={({ field }) => (
            <Input
              placeholder="Enter estimated days"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.day_extend?.message}
              keyboardType="numeric"
            />
          )}
        />
      </View>
      <ThemedText>
        You need to pay: $
        {(Number(totalWorker) * Number(costPerWorker)).toFixed(4)}
      </ThemedText>

      <Button
        title="Update"
        onPress={handleSubmit(onSubmit)}
        loading={isUpdatingJob}
      />
    </Modal>
  );
};

export default EditModal;
