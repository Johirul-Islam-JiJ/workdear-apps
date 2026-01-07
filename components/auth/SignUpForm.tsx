import { useThemeColor } from "@/hooks/useThemeColor";
import { useToast } from "@/hooks/useToast";
import { RegisterSchema, signUpDefaultValues } from "@/schema/auth";
import { useRegisterMutation } from "@/store/features/auth";
import { isFetchBaseQueryError } from "@/store/features/baseQuery";
import { Fontisto } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";
import CountrySelectField from "./CountrySelectField";

const SignUpForm = () => {
  const [showConfirmPasswoard, setShowConfirmPassword] = useState(false);
  const [showPasswoard, setShowPassword] = useState(false);
  const [registation, { isLoading, error }] = useRegisterMutation();
  const navigation = useRouter();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: signUpDefaultValues,
  });
  const checkbox = watch("acceptedTerms");
  const checkboxColor = useThemeColor(
    checkbox ? "primarydarker" : "placeholder"
  );
  const checkboxBorderColor = useThemeColor(
    errors.acceptedTerms ? "error" : checkbox ? "primarydark" : "border"
  );

  const emailIconColor = useThemeColor(errors.email ? "error" : "placeholder");
  const passwordIconColor = useThemeColor(
    errors.password ? "error" : "placeholder"
  );

  async function onSubmit(data: any) {
    try {
      data.device_name = "mobile";
      await registation(data).unwrap();
      navigation.navigate("/(mainLayout)/(drawer)/(tabs)");
    } catch (error: any) {
      toast.error(error.data.message || "Internal server error");
    }
  }

  return (
    <View style={{ gap: 7, padding: 10 }}>
      <View>
        <ThemedText>Full Name</ThemedText>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Enter your full name"
              value={value}
              onChangeText={onChange}
              error={errors.name?.message}
            />
          )}
        />
      </View>
      <View>
        <ThemedText>Email</ThemedText>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
              startIcon={
                <AppIcon color="placeholder" size={20}>
                  <Fontisto name="email" />
                </AppIcon>
              }
            />
          )}
        />
      </View>
      <View>
        <ThemedText>Password</ThemedText>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Enter the password"
              secureTextEntry={!showPasswoard}
              error={errors.password?.message}
              value={value}
              onChangeText={onChange}
              startIcon={
                <AppIcon color="placeholder" size={20}>
                  <Feather name="lock" />
                </AppIcon>
              }
              endIcon={
                <AppIcon color="placeholder" size={20}>
                  <Feather
                    onPress={() => setShowPassword(!showPasswoard)}
                    name={showPasswoard ? "eye-off" : "eye"}
                  />
                </AppIcon>
              }
            />
          )}
        />
      </View>

      <View>
        <ThemedText>Confirm Password</ThemedText>
        <Controller
          name="password_confirmation"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Re-enter the password"
              secureTextEntry={!showConfirmPasswoard}
              error={errors.password_confirmation?.message}
              value={value}
              onChangeText={onChange}
              startIcon={
                <AppIcon color="placeholder" size={20}>
                  <Feather name="lock" />
                </AppIcon>
              }
              endIcon={
                <AppIcon color="placeholder" size={20}>
                  <Feather
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPasswoard)
                    }
                    name={showConfirmPasswoard ? "eye-off" : "eye"}
                  />
                </AppIcon>
              }
            />
          )}
        />
      </View>

      <CountrySelectField
        control={control}
        setValue={setValue}
        errors={errors}
      />

      <View>
        <ThemedText>Manager ID</ThemedText>
        <Controller
          name="manager_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Enter the manager ID"
              error={errors.manager_id?.message}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      <View>
        <Controller
          name="acceptedTerms"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Pressable
              onPress={() => onChange(!value)}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 10,
                width: "95%",
              }}
            >
              <Checkbox
                style={{ borderColor: checkboxBorderColor, marginTop: 5 }}
                value={value}
                onValueChange={onChange}
                color={value ? checkboxColor : undefined}
              />
              <ThemedText>
                I agree to Workdear's{" "}
                <ThemedText underline>Terms of Service</ThemedText> and{" "}
                <ThemedText underline>Privacy Policy</ThemedText>
              </ThemedText>
            </Pressable>
          )}
        />
      </View>

      {error && isFetchBaseQueryError(error) && (
        <ThemedText
          variant="small"
          color="error"
          style={{ textAlign: "center" }}
        >
          {error.data.message}
        </ThemedText>
      )}

      <Button
        style={{ marginTop: 15 }}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        title="Sign up"
        variant="contained"
      />
    </View>
  );
};

export default SignUpForm;
