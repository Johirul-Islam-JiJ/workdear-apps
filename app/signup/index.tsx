import Header from "@/components/auth/Header";
import SignUpForm from "@/components/auth/SignUpForm";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

const SignUp = () => {
  return (
    <ThemedView color="card" style={{ flex: 1 }}>
      <Header
        subTitle="Sign up with your real information"
        title="Let's get started"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SignUpForm />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default SignUp;
