import { useThemeColor } from "@/hooks/useThemeColor";
import { useToast } from "@/hooks/useToast";
import { loginDefaultValues } from "@/schema/auth";
import { useLoginMutation } from "@/store/features/auth";
import { isFetchBaseQueryError } from "@/store/features/baseQuery";
import { Fontisto } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";
import Button from "../libs/Button";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type Payload = {
  email: string;
  password: string;
  device_name?: string;
};

const SignInForm = () => {
  const [showPasswoard, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const toast = useToast();
  const navigation = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Payload>({
    resolver: yupResolver(schema),
    defaultValues: loginDefaultValues,
  });
  const emailIconColor = useThemeColor(errors.email ? "error" : "placeholder");
  const passwordIconColor = useThemeColor(
    errors.password ? "error" : "placeholder"
  );

  async function onSubmit(data: Payload) {
    try {
      data.device_name = "mobile";
      await login(data).unwrap();
      navigation.navigate("/(mainLayout)/(tabs)");
    } catch (error: any) {
      toast.error(error.data.message || "Internal server error");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 20,
      }}
    >
      <View style={{ gap: 7 }}>
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
                  <Fontisto name="email" size={20} color={emailIconColor} />
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
                  <Feather name="lock" size={20} color={passwordIconColor} />
                }
                endIcon={
                  <Feather
                    onPress={() => setShowPassword(!showPasswoard)}
                    name={showPasswoard ? "eye-off" : "eye"}
                    size={20}
                    color={passwordIconColor}
                  />
                }
              />
            )}
          />
        </View>
        <ThemedText style={{ textAlign: "right" }} variant="link">
          Forgot password?
        </ThemedText>

        {error && isFetchBaseQueryError(error) && (
          <ThemedText
            color="error"
            variant="small"
            style={{ textAlign: "center" }}
          >
            {error.data.message}
          </ThemedText>
        )}
        <Button
          style={{ marginTop: 15 }}
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
          title="Sign in"
          variant="contained"
        />
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <ThemedText>Don’t have an account?</ThemedText>
        <Link href="/signup">
          <ThemedText variant="link">Sign up</ThemedText>
        </Link>
      </View>
    </View>
  );
};

export default SignInForm;
