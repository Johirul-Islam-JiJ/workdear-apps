import { useToast } from "@/hooks/useToast";
import { useVerifyOptMutation } from "@/store/features/auth";
import { isFetchBaseQueryError } from "@/store/features/baseQuery";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import Button from "../libs/Button";
import OtpInput from "../libs/OtpInput";
import { ThemedText } from "../libs/ThemedText";

const ResetPasswordForm = () => {
  const [verifyOptMutation, { isLoading, error }] = useVerifyOptMutation();
  const router = useRouter();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await verifyOptMutation(data).unwrap();
      router.push("/resetpassword");
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal server error");
    }
  };

  return (
    <View style={{ gap: 20, padding: 10, paddingTop: 20 }}>
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <OtpInput onChange={field.onChange} error={!!errors.code} />
        )}
      />

      {error && isFetchBaseQueryError(error) && (
        <ThemedText color="error" variant="body">
          {(error.data as { message?: string })?.message ||
            "Internal server error"}
        </ThemedText>
      )}

      <Button
        loading={isLoading}
        title="Verify"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default ResetPasswordForm;
