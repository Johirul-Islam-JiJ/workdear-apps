import ForgotForm from "@/components/auth/ForgotForm";
import Header from "@/components/auth/Header";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

const ForgotPassword = () => {
  return (
    <ThemedView color="card" style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flexGrow: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
            }}
          >
            <Header
              title="Forgot your password"
              subTitle="Let us know your email address"
            />
            <ForgotForm />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ForgotPassword;
