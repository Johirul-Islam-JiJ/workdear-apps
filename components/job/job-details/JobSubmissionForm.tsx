import Button from "@/components/libs/Button";
import ImagePicker from "@/components/libs/ImagePicker";
import Input from "@/components/libs/Input";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { useAppSelector } from "@/hooks/redux";
import { useToast } from "@/hooks/useToast";
import { useJobSubmissionMutation } from "@/store/features/jobs";
import { Job, QuestionCondition } from "@/types/Job";
import { Image } from "expo-image";
import { ImagePickerAsset } from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Controller,
  FieldErrors,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { View, ViewStyle } from "react-native";

type FormValues = {
  answer: {
    [key: string]: string;
  }[];
  images: ImagePickerAsset[];
};

const JobSubmissionForm = ({ job }: { job: Job }) => {
  const { user } = useAppSelector((state) => state.user);
  const [jobSubmission, { isLoading }] = useJobSubmissionMutation();
  const navigation = useRouter();
  const toast = useToast();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { fields: images, replace: replaceImage } = useFieldArray({
    name: "images",
    control,
  });
  const { fields: answers, replace: replaceAnswer } = useFieldArray({
    name: "answer",
    control,
  });
  const questions: QuestionCondition[] = JSON.parse(
    job.question_condition || "[]"
  );
  const requireScreenshots = parseInt(job.require_screenshots);

  useEffect(() => {
    reset();
    if (requireScreenshots) {
      const initialImages = Array.from(
        { length: requireScreenshots },
        () => null
      );
      replaceImage(initialImages);
    } else replaceImage([]);

    if (questions.length > 0) {
      const initialAnswers = questions.map((question) => {
        return {
          [question.id]: "",
        };
      });
      replaceAnswer(initialAnswers);
    } else replaceAnswer([]);
  }, [job]);

  async function onSubmit(payload: any) {
    try {
      const formData = new FormData();
      formData.append("job_id", job.id.toString());
      formData.append("proof_data", payload.proof_data);
      if (payload.answer)
        formData.append("answer", JSON.stringify(payload.answer));
      const images = payload.images;
      if (images) {
        for (const image of images) {
          const file = image;
          formData.append("images[]", {
            uri: file.uri,
            type: file.mimeType || "image/jpeg",
            name: file.fileName || `upload_${Date.now()}.jpg`,
          } as any);
        }
      }
      await jobSubmission(formData).unwrap();
      toast.success("Task submitted successfully");
      navigation.navigate("/(mainLayout)/(drawer)/(tabs)/my-work");
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Internal Server Error");
    }
  }

  const containerStyle: ViewStyle = {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    rowGap: 5,
  };
  return (
    <ThemedView color="card" style={containerStyle}>
      <ThemedText variant="body2">Submit this task and get paid</ThemedText>

      <ThemedText>Required proof that task was completed</ThemedText>
      <Controller
        control={control}
        name="proof_data"
        rules={{ required: "Proof text is required" }}
        render={({ field }) => (
          <Input
            placeholder="Type text proofs"
            numberOfLines={5}
            multiline
            height="auto"
            value={field.value}
            onChangeText={field.onChange}
            error={(errors.proof_data?.message as string) ?? ""}
          />
        )}
      />

      {answers.map((answer, index) => {
        const key = Object.keys(answer).find((k) => k !== "id") || "";
        const question = questions.find((item) => item.id.toString() === key);
        const answerErrors = errors.answer as
          | FieldErrors<FormValues["answer"]>
          | undefined;

        return (
          <Controller
            key={answer.id}
            control={control}
            name={`answer.${index}.${key}`}
            rules={{ required: "Answer is required" }}
            render={({ field }) => (
              <Input
                placeholder={question?.text}
                value={field.value}
                onChangeText={field.onChange}
                error={answerErrors?.[index]?.[key]?.message ?? ""}
              />
            )}
          />
        );
      })}

      {requireScreenshots > 0 && (
        <>
          <ThemedText>
            Attach required {requireScreenshots}{" "}
            {requireScreenshots > 1 ? "screenshots" : "screenshot"}
          </ThemedText>
          <View style={{ rowGap: 10 }}>
            {images.map((_image, index) => {
              const watchedImage = watch(`images.${index}`);
              const imageError = errors.images as
                | FieldErrors<FormValues["images"]>
                | undefined;

              return (
                <View key={index} style={{ rowGap: 5 }}>
                  <Controller
                    control={control}
                    name={`images.${index}`}
                    rules={{ required: "Screenshot is required" }}
                    render={({ field }) => (
                      <ImagePicker
                        value={field.value}
                        onChange={field.onChange}
                        error={imageError?.[index]?.message ?? ""}
                      />
                    )}
                  />
                  {watchedImage && watchedImage.uri && (
                    <Image
                      source={{ uri: watchedImage.uri }}
                      style={{ height: 150, width: "100%", borderRadius: 10 }}
                      alt="prevew"
                      contentFit="cover"
                    />
                  )}
                </View>
              );
            })}
          </View>
        </>
      )}

      <View style={{ marginTop: 10 }}>
        {user?.id === job?.provider?.id ? (
          <ThemedText
            style={{ textAlign: "center" }}
            color="warning"
            variant="body2"
          >
            You cannot submit your own task
          </ThemedText>
        ) : user?.verificationStatus === "VERIFIED" ? (
          <Button
            title="Submit"
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        ) : (
          <>
            <ThemedText
              style={{ textAlign: "center" }}
              color="warning"
              variant="body2"
            >
              You must be verified to submit a task
            </ThemedText>
            <Link href="/(mainLayout)/(drawer)/verification" asChild>
              <Button
                title="Verify now"
                style={{ marginTop: 5 }}
                endIcon="arrow-up-right-box-outline"
              />
            </Link>
          </>
        )}
      </View>
    </ThemedView>
  );
};

export default JobSubmissionForm;
