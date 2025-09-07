import Header from "@/components/auth/Header";
import SignUpForm from "@/components/auth/SignUpForm";
import React from "react";
import { View } from "react-native";

const SignUp = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Sign up to start your journey" />

      <SignUpForm />
    </View>
  );
};

export default SignUp;
