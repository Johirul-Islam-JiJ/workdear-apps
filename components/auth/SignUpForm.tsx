import { useThemeColor } from "@/hooks/useThemeColor";
import { Fontisto } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import * as yup from "yup";
import Button from "../libs/Button";
import { DropdownMenu } from "../libs/DropdownMenu";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Minimum 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: yup
    .string()
    .required("Re-enter password is required")
    .min(6, "Password must be at least 6 characters"),
  country_id: yup.string().required("Country is required"),
  manager_id: yup.string(),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms and Privacy Policy")
    .required(),
});

const SignUpForm = () => {
  const [showPasswoard, setShowPassword] = React.useState(false);
  const [showConfirmPasswoard, setShowConfirmPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      country_id: "",
      manager_id: "",
      acceptedTerms: false,
    },
  });
  const checkbox = watch("acceptedTerms");
  const checkboxColor = useThemeColor(
    checkbox ? "primaryDarker" : "placeHolder"
  );
  const checkboxBorderColor = useThemeColor(
    errors.acceptedTerms ? "error" : checkbox ? "primaryDarker" : "borderColor"
  );

  const emailIconColor = useThemeColor(errors.email ? "error" : "placeHolder");
  const passwordIconColor = useThemeColor(
    errors.password ? "error" : "placeHolder"
  );

  async function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 20,
      }}
    >
      <View style={{ gap: 7 }}>
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
                  <Feather name="lock" size={20} color={passwordIconColor} />
                }
                endIcon={
                  <Feather
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPasswoard)
                    }
                    name={showConfirmPasswoard ? "eye-off" : "eye"}
                    size={20}
                    color={passwordIconColor}
                  />
                }
              />
            )}
          />
        </View>
        <View>
          <ThemedText>Country</ThemedText>
          <Controller
            name="country_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropdownMenu
                value={value}
                items={[
                  { label: "Bangladesh", value: "1" },
                  { label: "India", value: "2" },
                ]}
                placeholder="Select your country"
                onSelect={onChange}
                error={errors.country_id?.message}
              />
            )}
          />
        </View>

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
                  gap: 6,
                }}
              >
                <Checkbox
                  style={{ borderColor: checkboxBorderColor, marginTop: 5 }}
                  value={value}
                  onValueChange={onChange}
                  color={value ? checkboxColor : undefined}
                />
                <ThemedText>
                  I agree to Workdear’s{" "}
                  <ThemedText
                    style={{ textDecorationLine: "underline" }}
                    type="link"
                  >
                    Terms of Service
                  </ThemedText>{" "}
                  and{" "}
                  <ThemedText
                    style={{ textDecorationLine: "underline" }}
                    type="link"
                  >
                    Privacy Policy
                  </ThemedText>
                </ThemedText>
              </Pressable>
            )}
          />
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          title="Sign Up"
          variant="Contained"
          style={{ marginTop: 10 }}
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
        <ThemedText>Already have an account?</ThemedText>
        <Link href="/signin">
          <ThemedText type="link">Login</ThemedText>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignUpForm;
