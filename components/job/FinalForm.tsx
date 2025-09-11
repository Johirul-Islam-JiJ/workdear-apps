import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { useCreateJobMutation } from "@/store/features/jobs";
import { setJobPostFinalForm } from "@/store/slices/jobform";
import { CostName } from "@/types/CostCenter";
import { JobPayload } from "@/types/Job";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "expo-checkbox";
import { ImagePickerAsset } from "expo-image-picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import Button from "../libs/Button";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

type Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const FinalForm = ({ step, setStep }: Props) => {
  const jobPostFee = useGetCostFromCostCenter(CostName.job_post_fee_percentage);
  const [createJob, { isLoading }] = useCreateJobMutation();
  const { generalData } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const { jobPostFinalForm, jobPostFirstForm } = useAppSelector(
    (state) => state.jobForm
  );
  const schema = yup.object({
    total_workers_required: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(parseInt(generalData.job_minimum_worker), "minimum worker need 1")
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
      .max(
        parseInt(generalData.job_required_screenshot_limit),
        `Maximum ${generalData.job_required_screenshot_limit} screenshot`
      )
      .required("Required screenshot is required"),
    estimated_day: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(
        parseInt(generalData?.job_minimum_estimated_day),
        `Minimum ${generalData?.job_minimum_estimated_day} day`
      )
      .max(
        parseInt(generalData?.job_maximum_estimated_day),
        `Maximum ${generalData?.job_maximum_estimated_day} day`
      )
      .required("Estimated day is required"),
    status: yup.string().trim().required("Status is required"),
  });
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      total_workers_required:
        jobPostFinalForm.total_workers_required ||
        parseInt(generalData.job_minimum_worker),
      pay_per_task:
        jobPostFinalForm.pay_per_task ||
        parseFloat(jobPostFinalForm.minimum_pay),
      require_screenshots: jobPostFinalForm.require_screenshots,
      estimated_day:
        jobPostFinalForm.estimated_day ||
        parseInt(generalData.job_minimum_estimated_day),
      status: jobPostFinalForm.status,
    },
  });

  const totalWorker = watch("total_workers_required");
  const payPerTask = watch("pay_per_task");
  const estimatedCost = totalWorker * payPerTask;
  const fee = estimatedCost * jobPostFee;
  const totalCost = estimatedCost + fee;

  async function onSubmit(data: any) {
    try {
      const payload: JobPayload = {
        ...jobPostFinalForm,
        ...data,
        ...jobPostFirstForm,
      };

      delete payload.minimum_pay;

      if (!JSON.parse(payload.required_proofs || "[]")[0]?.type) {
        delete payload.required_proofs;
      }

      if (!JSON.parse(payload.question_condition || "[]")[0]?.answer_type) {
        delete payload.question_condition;
      }

      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        if (key === "country_ids" && Array.isArray(value)) {
          value.forEach((countryId) => {
            formData.append("country_ids[]", String(countryId));
          });
        } else if (key === "thumbnail" && value) {
          const file = value as ImagePickerAsset;
          formData.append("thumbnail", {
            uri: file.uri,
            type: file.mimeType || "image/jpeg", // fallback
            name: file.fileName || `upload_${Date.now()}.jpg`,
          } as any);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      await createJob(formData).unwrap();

      Toast.show({
        type: "success",
        text1: "Job created successfully",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error?.data?.message || "Internal server error",
      });
      console.log(error);
    }
  }

  function handlePrevStep() {
    const payload = {
      ...jobPostFinalForm,
      total_workers_required: getValues("total_workers_required"),
      pay_per_task: getValues("pay_per_task"),
      require_screenshots: getValues("require_screenshots"),
      estimated_day: getValues("estimated_day"),
      status: getValues("status"),
    };
    dispatch(setJobPostFinalForm(payload));
    setStep((prev) => prev - 1);
  }

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
          <ThemedView
            color="white"
            style={{
              gap: 10,
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
                    keyboardType="numeric"
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
                    keyboardType="numeric"
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
                    keyboardType="numeric"
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
                    keyboardType="numeric"
                    value={value?.toString()}
                    onChangeText={onChange}
                    placeholder="Enter estimated day"
                    error={errors.estimated_day?.message}
                  />
                )}
              />
            </View>
          </ThemedView>

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
            <ThemedText color="error">Job post fee {jobPostFee}%</ThemedText>
            <ThemedText type="defaultSemiBold">Total Cost</ThemedText>
            <Input
              editable={false}
              value={`$${totalCost.toFixed(4)}`}
              placeholder="Enter total cost"
            />
          </ThemedView>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Button
            disabled={step === 0}
            onPress={handlePrevStep}
            title="Previews"
            variant="Outlined"
            style={{ flex: 1 }}
          />
          <Button
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
            title="Submit"
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FinalForm;
