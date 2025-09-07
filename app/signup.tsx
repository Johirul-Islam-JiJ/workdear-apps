import Header from "@/components/auth/Header";
import SignUpForm from "@/components/auth/SignUpForm";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

const SignUp = () => {
  return (
    <ThemedView color="lightGray" style={{ flex: 1 }}>
      <Header title="Sign up to start your journey" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        enabled
      >
        <SignUpForm />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default SignUp;
