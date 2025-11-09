import Header from "@/components/auth/Header";
import SignInForm from "@/components/auth/SignInForm";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";

const SignIn = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <Header title="Sign in to continue your journey" />

      <SignInForm />
    </ThemedView>
  );
};

export default SignIn;
