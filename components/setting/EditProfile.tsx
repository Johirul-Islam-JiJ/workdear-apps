import { useAppSelector } from "@/hooks/redux";
import { useToast } from "@/hooks/useToast";
import { EditProfileSchema } from "@/schema/auth";
import {
  useSendVarificationMailMutation,
  useUpdateProfileMutation,
} from "@/store/features/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";

const EditProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [sendVarificationEmail, { isLoading: isLoadingVarification }] =
    useSendVarificationMailMutation();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditProfileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      age: user?.age || "",
      country: user?.country?.country_name || "",
      about_me: user?.about_me || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.data?.message || "Internal server error");
    }
  };

  const handleSendVarificationMessage = async () => {
    try {
      await sendVarificationEmail(undefined).unwrap();
      toast.success("Verification email sent successfully");
    } catch (error: any) {
      toast.error(error.data?.message || "Internal server error");
    }
  };

  return (
    <Card>
      <ThemedText variant="subtitle">Edit profile information</ThemedText>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>Full Name</ThemedText>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter your full name"
              error={errors.name?.message}
            />
          </View>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>Email Address</ThemedText>
            <Input
              editable={!user?.email_verified_at}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter your email address"
              error={errors.email?.message}
              EndAdorment={
                <View
                  style={{ position: "absolute", right: 0, top: 0, bottom: 0 }}
                >
                  <Button
                    style={{ height: "100%" }}
                    loading={isLoadingVarification}
                    disabled={
                      isLoadingVarification || !!user?.email_verified_at
                    }
                    color={user?.email_verified_at ? "success" : "warning"}
                    title={user?.email_verified_at ? "Verified" : "Verify"}
                    onPress={handleSendVarificationMessage}
                  />
                </View>
              }
            />
          </View>
        )}
      />
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>Age</ThemedText>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter your age"
              error={errors.age?.message}
            />
          </View>
        )}
      />
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>Country</ThemedText>
            <Input
              editable={false}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter country"
              error={errors.country?.message}
            />
          </View>
        )}
      />
      <Controller
        name="about_me"
        control={control}
        render={({ field }) => (
          <View>
            <ThemedText>About me</ThemedText>
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Type about you"
              error={errors.about_me?.message}
            />
          </View>
        )}
      />
      <Button
        title="Update"
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 10 }}
        loading={isLoading}
      />
    </Card>
  );
};

export default EditProfile;
