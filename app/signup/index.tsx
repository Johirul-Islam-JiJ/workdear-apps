import Header from "@/components/auth/Header";
import SignUpForm from "@/components/auth/SignUpForm";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

const SignUp = () => {
  return (
    <ThemedView color="card" style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flexGrow: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <Header
              subTitle="Sign up with your real information"
              title="Let's get started"
            />
            <SignUpForm />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default SignUp;
