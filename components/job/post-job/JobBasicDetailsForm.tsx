import { selectOptions } from "@/_mock/selectOptions";
import AppIcon from "@/components/libs/AppIcon";
import Button from "@/components/libs/Button";
import { DropdownMenu } from "@/components/libs/DropdownMenu";
import Input from "@/components/libs/Input";
import { ThemedText } from "@/components/libs/ThemedText";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { JobBasicDetailsSchema } from "@/schema/jobs";
import { setJobPostFirstForm } from "@/store/slices/jobform";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";

type Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const JobBasicDetailsForm = ({ step, setStep }: Props) => {
  const dispatch = useAppDispatch();
  const { jobPostFirstForm } = useAppSelector((state) => state.jobForm);
  const [image, setImage] = useState<string | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(JobBasicDetailsSchema),
    defaultValues: {
      title: jobPostFirstForm.title,
      description: jobPostFirstForm.description,
      steps: JSON.parse(jobPostFirstForm.steps),
      required_proofs: JSON.parse(jobPostFirstForm.required_proofs),
      question_condition: JSON.parse(jobPostFirstForm.question_condition),
      thumbnail: jobPostFirstForm.thumbnail,
    },
  });

  const steps = useFieldArray({ control, name: "steps" });
  const requiredProofs = useFieldArray({ control, name: "required_proofs" });
  const questionCondition = useFieldArray({
    control,
    name: "question_condition",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValue("thumbnail", result.assets[0], { shouldValidate: true });
      setImage(result.assets[0].uri);
    }
  };

  async function onSubmit(data: any) {
    data.steps = JSON.stringify(data.steps);
    data.required_proofs = JSON.stringify(data.required_proofs);
    data.question_condition = JSON.stringify(data.question_condition);
    dispatch(setJobPostFirstForm(data));
    setStep(step + 1);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            rowGap: 10,
          }}
        >
          <ThemedText
            variant="bodySemiBold"
            color="primarydarker"
            darkColor="white"
          >
            Job basic information
          </ThemedText>

          <View>
            <ThemedText>Write an accurate job title:</ThemedText>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Enter your job title"
                  value={field.value}
                  onChangeText={field.onChange}
                  error={errors.title?.message}
                />
              )}
            />
          </View>

          <View>
            <ThemedText>Job Description</ThemedText>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Describe your job"
                  multiline
                  numberOfLines={10}
                  height="auto"
                  value={field.value}
                  onChangeText={field.onChange}
                  error={errors.description?.message}
                />
              )}
            />
          </View>

          {/* steps  */}
          <View>
            <ThemedText>Write specific task you need to complete:</ThemedText>
            {steps.fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`steps.${index}.instruction`}
                control={control}
                render={({ field }) => (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "flex-start",
                      columnGap: 8,
                      marginTop: 7,
                    }}
                  >
                    <View style={{ position: "relative", flex: 1 }}>
                      <Input
                        placeholder={`Step ${index + 1}`}
                        value={field.value}
                        onChangeText={field.onChange}
                        error={errors.steps?.[index]?.instruction?.message}
                      />

                      {index !== 0 && (
                        <Pressable
                          onPress={() => steps.remove(index)}
                          style={{ position: "absolute", right: -2, top: -10 }}
                        >
                          <AppIcon size={24} color="error">
                            <Ionicons name="remove-circle" />
                          </AppIcon>
                        </Pressable>
                      )}
                    </View>
                    {/* show only for the last element */}
                    {index === steps.fields.length - 1 && (
                      <Button
                        title={
                          <AppIcon size={20} color="primarydark">
                            <Entypo name="plus" />
                          </AppIcon>
                        }
                        variant="outlined"
                        onPress={() =>
                          steps.append({
                            step_number: steps.fields.length + 1,
                            instruction: "",
                          })
                        }
                      />
                    )}
                  </View>
                )}
              />
            ))}
          </View>

          {/* required proof  */}
          {requiredProofs.fields.map((field, index) => (
            <View key={field.id}>
              <ThemedText>
                Require the proof{" "}
                {index === 0 ? "the job was completed" : index + 1}:
              </ThemedText>
              <View style={{ marginTop: 7, position: "relative" }}>
                <Controller
                  name={`required_proofs.${index}.type`}
                  control={control}
                  render={({ field }) => (
                    <DropdownMenu
                      items={selectOptions.job.required_proof_type}
                      placeholder="Proof type"
                      value={field.value as string}
                      onSelect={field.onChange}
                      error={errors.required_proofs?.[index]?.type?.message}
                      border
                    />
                  )}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 8,
                    marginTop: 7,
                  }}
                >
                  <Controller
                    name={`required_proofs.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Proof description"
                        value={field.value as string}
                        onChangeText={field.onChange}
                        error={
                          errors.required_proofs?.[index]?.description?.message
                        }
                      />
                    )}
                  />
                  {/* {index === requiredProofs.fields.length - 1 && (
                    <Button
                      onPress={() =>
                        requiredProofs.append({
                          type: "",
                          description: "",
                        })
                      }
                      title={
                        <AppIcon size={20} color="primarydark">
                            <Entypo name="plus" />
                          </AppIcon>
                      }
                      variant="outlined"
                    />
                  )} */}
                </View>

                {/* remove button */}
                {/* {index !== 0 && (
                  <Pressable
                    onPress={() => requiredProofs.remove(index)}
                    style={{ position: "absolute", right: -2, top: -10 }}
                  >
                    <AppIcon size={24} color="error">
                            <Ionicons name="remove-circle" />
                          </AppIcon>
                  </Pressable>
                )} */}
              </View>
            </View>
          ))}

          {/* question condition  */}
          {questionCondition.fields.map((field, index) => (
            <View key={field.id}>
              <ThemedText>
                {index === 0
                  ? "Require the answer of question:"
                  : `Question ${index + 1}:`}
              </ThemedText>
              <View style={{ marginTop: 7, position: "relative" }}>
                <Controller
                  name={`question_condition.${index}.answer_type`}
                  control={control}
                  render={({ field }) => (
                    <DropdownMenu
                      items={selectOptions.job.question_condition_type}
                      placeholder="Select Answer Type"
                      value={field.value as string}
                      border
                      onSelect={(value) => {
                        field.onChange(value);
                        if (value === "text") {
                          setValue(
                            `question_condition.${index}.condition.operator`,
                            "==",
                            {
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                      error={
                        errors.question_condition?.[index]?.answer_type?.message
                      }
                    />
                  )}
                />
                <Controller
                  name={`question_condition.${index}.text`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter question"
                      style={{ marginTop: 7 }}
                      value={field.value as string}
                      onChangeText={field.onChange}
                      error={errors.question_condition?.[index]?.text?.message}
                    />
                  )}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    columnGap: 8,
                    marginTop: 7,
                  }}
                >
                  <Controller
                    name={`question_condition.${index}.condition.operator`}
                    control={control}
                    render={({ field }) => (
                      <DropdownMenu
                        border
                        disabled={
                          watch(`question_condition.${index}.answer_type`) ===
                          "text"
                        }
                        items={selectOptions.job.question_condition_operator}
                        placeholder="Condition"
                        value={field.value as string}
                        onSelect={field.onChange}
                        error={
                          errors.question_condition?.[index]?.condition
                            ?.operator?.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name={`question_condition.${index}.condition.value`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        keyboardType={
                          watch(`question_condition.${index}.answer_type`) ===
                          "number"
                            ? "numeric"
                            : "name-phone-pad"
                        }
                        placeholder="Answer"
                        value={field.value as string}
                        onChangeText={field.onChange}
                        error={
                          errors.question_condition?.[index]?.condition?.value
                            ?.message
                        }
                      />
                    )}
                  />
                  {/* add another */}
                  {/* {index === questionCondition.fields.length - 1 && (
                    <Button
                      onPress={() =>
                        questionCondition.append({
                          id: questionCondition.fields.length + 1,
                          answer_type: "",
                          text: "",
                          condition: {
                            operator: "",
                            value: "",
                          },
                        })
                      }
                      title={
                        <AppIcon size={20} color="primarydark">
                            <Entypo name="plus" />
                          </AppIcon>
                      }
                      variant="outlined"
                    />
                  )} */}
                </View>

                {/* remove button */}
                {/* {index !== 0 && (
                  <Pressable
                    onPress={() => questionCondition.remove(index)}
                    style={{ position: "absolute", right: -2, top: -10 }}
                  >
                    <AppIcon size={24} color="error">
                            <Ionicons name="remove-circle" />
                          </AppIcon>
                  </Pressable>
                )} */}
              </View>
            </View>
          ))}
          <View>
            <ThemedText style={{ marginBottom: 5 }}>
              Thumbnail Image:
            </ThemedText>
            <Button
              variant="outlined"
              onPress={pickImage}
              color={errors.thumbnail?.message ? "error" : undefined}
              title={
                <View style={{ flexDirection: "row", columnGap: 4 }}>
                  <AppIcon
                    size={20}
                    color={errors.thumbnail?.message ? "error" : "primarydark"}
                  >
                    <Ionicons name="document-attach" />
                  </AppIcon>
                  <ThemedText
                    color={errors.thumbnail?.message ? "error" : "primarydark"}
                  >
                    Select Image
                  </ThemedText>
                </View>
              }
            />
            {errors.thumbnail && (
              <ThemedText color="error">{errors.thumbnail.message}</ThemedText>
            )}
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ height: 100, borderRadius: 10, marginTop: 5 }}
              />
            ) : typeof jobPostFirstForm.thumbnail !== "string" &&
              jobPostFirstForm.thumbnail?.uri ? (
              <Image
                source={{ uri: jobPostFirstForm.thumbnail.uri }}
                style={{ height: 100, borderRadius: 10, marginTop: 5 }}
              />
            ) : typeof jobPostFirstForm.thumbnail == "string" ? (
              <Image
                source={{
                  uri: config.fileBaseUrl + jobPostFirstForm.thumbnail,
                }}
                style={{ height: 100, borderRadius: 10, marginTop: 5 }}
              />
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginTop: 10,
            }}
          >
            <Button
              disabled={step === 0}
              onPress={() => setStep(step - 1)}
              title="Previews"
              variant="outlined"
              style={{ flex: 1 }}
            />
            <Button
              title="Next"
              style={{ flex: 1 }}
              disabled={step === 3}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default JobBasicDetailsForm;
