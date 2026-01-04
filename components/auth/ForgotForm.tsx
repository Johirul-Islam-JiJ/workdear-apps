import { useToast } from "@/hooks/useToast";
import { useForgotPasswordMutation } from "@/store/features/auth";
import { isFetchBaseQueryError } from "@/store/features/baseQuery";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";
import Button from "../libs/Button";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

const ForgotForm = () => {
  const [resetPasswordMutation, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    resetPasswordMutation(data);
  };

  return (
    <View style={{ gap: 15, padding: 10 }}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <View>
            <ThemedText>Email address</ThemedText>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter email address"
              error={errors.email?.message}
            />
          </View>
        )}
      />

      {error && isFetchBaseQueryError(error) && (
        <ThemedText color="error" variant="body">
          {(error.data as { message?: string })?.message ||
            "Internal server error"}
        </ThemedText>
      )}
      {isSuccess && (
        <ThemedText color="success" variant="body">
          Password reset email sent successfully
        </ThemedText>
      )}

      <Button
        title="Reset password"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
    </View>
  );
};

export default ForgotForm;
