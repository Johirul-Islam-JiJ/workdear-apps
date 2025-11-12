import Header from "@/components/auth/Header";
import SignInForm from "@/components/auth/SignInForm";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";

const SignIn = () => {
  return (
    <ThemedView color="card" style={{ flex: 1 }}>
      <Header
        subTitle="You have been missed, Good to see you again!"
        title="Welcome back"
      />

      <SignInForm />
    </ThemedView>
  );
};

export default SignIn;
