import { useToast } from "@/hooks/useToast";
import { ForgetPasswordSchema } from "@/schema/auth";
import { useResetPasswordMutation } from "@/store/features/auth";
import { isFetchBaseQueryError } from "@/store/features/baseQuery";
import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import Input from "../libs/Input";
import OtpInput from "../libs/OtpInput";
import { ThemedText } from "../libs/ThemedText";

type payload = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};

const ResetPasswordForm = () => {
  const [resetPasswordMutation, { isLoading, error }] =
    useResetPasswordMutation();
  const [showPasswoard, setShowPassword] = useState(false);
  const [showConfirmPasswoard, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { email } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<payload>({
    resolver: yupResolver(ForgetPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
      token: "",
      email: email as string,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await resetPasswordMutation(data).unwrap();
      router.push("/signin");
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal server error");
    }
  };

  return (
    <View style={{ gap: 10, padding: 10, paddingTop: 20 }}>
      <Controller
        name="token"
        control={control}
        render={({ field }) => (
          <View>
            <OtpInput onChange={field.onChange} error={!!errors.token} />
            <ThemedText
              style={{ textAlign: "center", marginTop: 5 }}
              color="gray.500"
              darkColor="gray.400"
            >
              An OTP has been sent to your email
            </ThemedText>
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <View>
            <ThemedText>New password</ThemedText>
            <Input
              placeholder="Type your new password"
              secureTextEntry
              error={errors.password?.message}
              value={field.value}
              onChangeText={field.onChange}
              endIcon={
                <AppIcon color="placeholder">
                  <Feather
                    onPress={() => setShowPassword(!showPasswoard)}
                    name={showPasswoard ? "eye-off" : "eye"}
                    size={20}
                  />
                </AppIcon>
              }
            />
          </View>
        )}
      />

      <Controller
        control={control}
        name="password_confirmation"
        render={({ field }) => (
          <View>
            <ThemedText>Confirm password</ThemedText>
            <Input
              placeholder="Confirm your password"
              secureTextEntry
              error={errors.password_confirmation?.message}
              value={field.value}
              onChangeText={field.onChange}
              endIcon={
                <AppIcon color="placeholder">
                  <Feather
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPasswoard)
                    }
                    name={showConfirmPasswoard ? "eye-off" : "eye"}
                    size={20}
                  />
                </AppIcon>
              }
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

      <Button
        style={{ marginTop: 10 }}
        loading={isLoading}
        title="Reset"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default ResetPasswordForm;
