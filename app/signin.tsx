import Header from "@/components/auth/Header";
import SignInForm from "@/components/auth/SignInForm";
import React from "react";
import { View } from "react-native";

const SignIn = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Sign in to continue your journey" />

      <SignInForm />
    </View>
  );
};

export default SignIn;
