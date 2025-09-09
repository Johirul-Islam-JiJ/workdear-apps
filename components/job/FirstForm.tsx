import { selectOptions } from "@/_mock/selectOptions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import Button from "../libs/Button";
import { DropdownMenu } from "../libs/DropdownMenu";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import { firstFormSchema, FistFormData } from "./types";

type Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const FirstForm = ({ step, setStep }: Props) => {
  const primaryDarker = useThemeColor("primaryDarker");
  const [image, setImage] = React.useState<string | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(firstFormSchema),
    defaultValues: {
      title: "",
      description: "",
      steps: [
        {
          step_number: 1,
          instruction: "",
        },
      ],
      required_proofs: [
        {
          type: "",
          description: "",
        },
      ],
      question_condition: [
        {
          id: 1,
          answer_type: "",
          text: "",
          condition: {
            operator: "",
            value: "",
          },
        },
      ],
      thumbnail: undefined,
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
      setValue("thumbnail", result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  async function onSubmit(data: FistFormData) {
    try {
      setStep(step + 1);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      enabled
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            rowGap: 10,
            paddingBottom: 15,
          }}
        >
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
                      position: "relative",
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "flex-start",
                      columnGap: 8,
                      marginTop: 7,
                    }}
                  >
                    <Input
                      placeholder={`Step ${index + 1}`}
                      value={field.value}
                      onChangeText={field.onChange}
                      error={errors.steps?.[index]?.instruction?.message}
                    />
                    {/* not show for the last element */}
                    {index !== steps.fields.length - 1 && (
                      <Pressable
                        onPress={() => steps.remove(index)}
                        style={{ position: "absolute", right: -2, top: -10 }}
                      >
                        <Ionicons
                          name="remove-circle"
                          size={24}
                          color="#FA1E00"
                        />
                      </Pressable>
                    )}
                    {/* show only for the last element */}
                    {index === steps.fields.length - 1 && (
                      <Button
                        onPress={() =>
                          steps.append({
                            step_number: steps.fields.length + 1,
                            instruction: "",
                          })
                        }
                        title={<Entypo name="plus" size={20} color="black" />}
                        variant="Outlined"
                      />
                    )}
                  </View>
                )}
              />
            ))}
          </View>

          <View>
            <ThemedText>Require the proof the job was completed:</ThemedText>
            {requiredProofs.fields.map((field, index) => (
              <View
                key={field.id}
                style={{ marginTop: 7, position: "relative" }}
              >
                <Controller
                  name={`required_proofs.${index}.type`}
                  control={control}
                  render={({ field }) => (
                    <DropdownMenu
                      items={selectOptions.job.required_proof_type}
                      placeholder="Proof type"
                      value={field.value as string}
                      onSelect={field.onChange}
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
                  {index === requiredProofs.fields.length - 1 && (
                    <Button
                      onPress={() =>
                        requiredProofs.append({
                          type: "",
                          description: "",
                        })
                      }
                      title={<Entypo name="plus" size={20} color="black" />}
                      variant="Outlined"
                    />
                  )}
                </View>

                {/* remove button */}
                {index !== 0 && (
                  <Pressable
                    onPress={() => requiredProofs.remove(index)}
                    style={{ position: "absolute", right: -2, top: -10 }}
                  >
                    <Ionicons name="remove-circle" size={24} color="#FA1E00" />
                  </Pressable>
                )}

                {index !== requiredProofs.fields.length - 1 && (
                  <ThemedView
                    color="primaryDark"
                    style={{ height: 2, marginTop: 7 }}
                  />
                )}
              </View>
            ))}
          </View>

          <View>
            <ThemedText>Question condition:</ThemedText>
            {questionCondition.fields.map((field, index) => (
              <View
                key={field.id}
                style={{ marginTop: 7, position: "relative" }}
              >
                <Controller
                  name={`question_condition.${index}.answer_type`}
                  control={control}
                  render={({ field }) => (
                    <DropdownMenu
                      items={selectOptions.job.question_condition_type}
                      placeholder="Select Type"
                      value={field.value as string}
                      onSelect={field.onChange}
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
                      placeholder={`Question ${index + 1}`}
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
                    alignItems: "center",
                    columnGap: 8,
                    marginTop: 7,
                  }}
                >
                  <Controller
                    name={`question_condition.${index}.condition.operator`}
                    control={control}
                    render={({ field }) => (
                      <DropdownMenu
                        items={selectOptions.job.question_condition_operator}
                        placeholder="Select Oparator"
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
                        placeholder="Value"
                        value={field.value as string}
                        onChangeText={field.onChange}
                        error={
                          errors.question_condition?.[index]?.condition?.value
                            ?.message
                        }
                      />
                    )}
                  />
                  {index === questionCondition.fields.length - 1 && (
                    <Button
                      onPress={() =>
                        questionCondition.append({
                          id: field.id + 1,
                          answer_type: "",
                          text: "",
                          condition: {
                            operator: "",
                            value: "",
                          },
                        })
                      }
                      title={<Entypo name="plus" size={20} color="black" />}
                      variant="Outlined"
                    />
                  )}
                </View>

                {/* remove button */}
                {index !== 0 && (
                  <Pressable
                    onPress={() => questionCondition.remove(index)}
                    style={{ position: "absolute", right: -2, top: -10 }}
                  >
                    <Ionicons name="remove-circle" size={24} color="#FA1E00" />
                  </Pressable>
                )}

                {index !== questionCondition.fields.length - 1 && (
                  <ThemedView
                    color="primaryDark"
                    style={{ height: 2, marginTop: 7 }}
                  />
                )}
              </View>
            ))}
          </View>
          <View>
            <ThemedText>Thumbnail Image:</ThemedText>
            <Button
              variant="Outlined"
              onPress={pickImage}
              title={
                <View style={{ flexDirection: "row", columnGap: 4 }}>
                  <Ionicons
                    name="document-attach"
                    size={20}
                    color={primaryDarker}
                  />
                  <ThemedText color="primaryDarker">Select Image</ThemedText>
                </View>
              }
            />
            {errors.thumbnail && (
              <ThemedText color="error">{errors.thumbnail.message}</ThemedText>
            )}
            {image && (
              <Image
                source={{ uri: image }}
                style={{ height: 100, borderRadius: 10, marginTop: 5 }}
              />
            )}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Button
              disabled={step === 0}
              onPress={() => setStep(step - 1)}
              title="Previews"
              variant="Outlined"
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

export default FirstForm;
