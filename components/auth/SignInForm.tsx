import { useThemeColor } from "@/hooks/useThemeColor";
import { Fontisto } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";
import Button from "../libs/Button";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

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
  const [showPasswoard, setShowPassword] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Payload>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const emailIconColor = useThemeColor(errors.email ? "error" : "placeHolder");
  const passwordIconColor = useThemeColor(
    errors.password ? "error" : "placeHolder"
  );

  async function onSubmit(data: Payload) {
    console.log(data);
  }

  return (
    <ThemedView
      color="lightGray"
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
        <ThemedText style={{ textAlign: "right" }} type="link">
          Forgot password?
        </ThemedText>
        <Button
          onPress={handleSubmit(onSubmit)}
          title="Sign in"
          variant="Contained"
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
          <ThemedText type="link">Sign up</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
};

export default SignInForm;
