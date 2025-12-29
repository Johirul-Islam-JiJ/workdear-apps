import { useAppDispatch } from "@/hooks/redux";
import { useToast } from "@/hooks/useToast";
import { ResetPasswordSchema } from "@/schema/auth";
import { useUpdatePasswordMutation } from "@/store/features/auth";
import { logout } from "@/store/slices/user";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";

const AccountPassword = () => {
  const [updatePassword, { isLoading: isLoadingPassword }] =
    useUpdatePasswordMutation();
  const [showPassCurrent, setShowPassCurrent] = useState(false);
  const [showPassNew, setShowPassNew] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const {
    control,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      old_password: "",
      password_confirmation: "",
    },
  });

  const onSubmitPassword = async (data: any) => {
    try {
      await updatePassword(data).unwrap();
      toast.success("Password updated successfully");
      Alert.alert("Logout", "Please logout to apply changes", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            dispatch(logout());
          },
        },
      ]);
    } catch (error: any) {
      toast.error(error.data?.message || "Internal server error");
    }
  };

  return (
    <Card>
      <ThemedText variant="subtitle">Account password</ThemedText>
      <Controller
        name="old_password"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>Current password</ThemedText>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter your current password"
              secureTextEntry={!showPassCurrent}
              error={errorsPassword.old_password?.message}
              endIcon={
                <AppIcon color="text" size={20}>
                  <Ionicons
                    onPress={() => setShowPassCurrent((prev) => !prev)}
                    name={showPassCurrent ? "eye-off" : "eye"}
                  />
                </AppIcon>
              }
            />
          </View>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>New password</ThemedText>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter your new password"
              secureTextEntry={!showPassNew}
              error={errorsPassword.password?.message}
              endIcon={
                <AppIcon color="text" size={20}>
                  <Ionicons
                    onPress={() => setShowPassNew((prev) => !prev)}
                    name={showPassNew ? "eye-off" : "eye"}
                  />
                </AppIcon>
              }
            />
          </View>
        )}
      />
      <Controller
        name="password_confirmation"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>Confirm password</ThemedText>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Confirm password"
              secureTextEntry={!showPassConfirm}
              error={errorsPassword.password_confirmation?.message}
              endIcon={
                <AppIcon color="text" size={20}>
                  <Ionicons
                    onPress={() => setShowPassConfirm((prev) => !prev)}
                    name={showPassConfirm ? "eye-off" : "eye"}
                  />
                </AppIcon>
              }
            />
          </View>
        )}
      />
      <Button
        onPress={handleSubmitPassword(onSubmitPassword)}
        loading={isLoadingPassword}
        title="Update password"
        style={{ marginTop: 10 }}
      />
    </Card>
  );
};

export default AccountPassword;
