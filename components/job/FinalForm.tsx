import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "expo-checkbox";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import * as yup from "yup";
import Button from "../libs/Button";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

type Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const generalData = {
  job_minimum_worker: 1,
  job_minimum_estimated_day: 1,
  job_maximum_estimated_day: 1,
};
const jobPostFinalForm = {
  minimum_pay: "1",
};

const FinalForm = ({ step, setStep }: Props) => {
  const schema = yup.object({
    total_workers_required: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(generalData?.job_minimum_worker, "minimum worker need 1")
      .required("Worker is required"),
    pay_per_task: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(
        parseFloat(jobPostFinalForm.minimum_pay),
        `minimum ${jobPostFinalForm.minimum_pay} is required`
      )
      .required("Each worker earn is required"),
    require_screenshots: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .typeError("Required screenshot must be a number")
      .max(3, "Maximum 3 required screenshot is required")
      .required("Required screenshot is required"),
    estimated_day: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(
        generalData?.job_minimum_estimated_day,
        `Minimum ${generalData?.job_minimum_estimated_day} day`
      )
      .required("Estimated day is required")
      .max(
        generalData?.job_maximum_estimated_day,
        `Maximum ${generalData?.job_maximum_estimated_day} days`
      ),
    status: yup.string().trim().required("Status is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      total_workers_required: 1,
      pay_per_task: 1,
      require_screenshots: 0,
      estimated_day: 1,
      status: "DRAFT",
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      enabled
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          paddingBottom: 15,
        }}
      >
        <View
          style={{
            flexGrow: 1,
            gap: 10,
          }}
        >
          <View
            style={{
              gap: 10,
              backgroundColor: "white",
              paddingVertical: 15,
              paddingHorizontal: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View>
              <ThemedText type="defaultSemiBold">Worker need</ThemedText>
              <Controller
                name="total_workers_required"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value?.toString()}
                    onChangeText={onChange}
                    placeholder="Enter worker need"
                    error={errors.total_workers_required?.message}
                  />
                )}
              />
            </View>

            <View>
              <ThemedText type="defaultSemiBold">Each worker earn </ThemedText>
              <Controller
                name="pay_per_task"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value?.toString()}
                    onChangeText={onChange}
                    placeholder="Enter worker earn"
                    error={errors.pay_per_task?.message}
                  />
                )}
              />
            </View>

            <View>
              <ThemedText type="defaultSemiBold">
                Required Screenshot
              </ThemedText>
              <Controller
                name="require_screenshots"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value?.toString()}
                    onChangeText={onChange}
                    placeholder="Enter screenshot amount"
                    error={errors.require_screenshots?.message}
                  />
                )}
              />
            </View>

            <View>
              <ThemedText type="defaultSemiBold">Estimated day</ThemedText>
              <Controller
                name="estimated_day"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value?.toString()}
                    onChangeText={onChange}
                    placeholder="Enter estimated day"
                    error={errors.estimated_day?.message}
                  />
                )}
              />
            </View>
          </View>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Pressable
                onPress={() =>
                  field.onChange(field.value === "DRAFT" ? "PENDING" : "DRAFT")
                }
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Checkbox
                  value={field.value === "DRAFT"}
                  onChange={() =>
                    field.onChange(
                      field.value === "DRAFT" ? "PENDING" : "DRAFT"
                    )
                  }
                />
                <ThemedText type="defaultSemiBold">Save as Draft</ThemedText>
              </Pressable>
            )}
          />

          <ThemedView
            color="white"
            style={{
              padding: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              marginTop: 15,
            }}
          >
            <ThemedText color="error">Job post fee 10%</ThemedText>
            <ThemedText type="defaultSemiBold">Total Cost</ThemedText>
            <Input editable={false} placeholder="Enter total cost" />
          </ThemedView>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Button
            disabled={step === 0}
            onPress={() => setStep(step - 1)}
            title="Previews"
            variant="Outlined"
            style={{ flex: 1 }}
          />
          <Button title="Submit" style={{ flex: 1 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FinalForm;
