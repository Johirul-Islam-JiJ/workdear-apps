import Header from "@/components/auth/Header";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ResetPassword = () => {
  const frame = useSafeAreaInsets();

  return (
    <ThemedView color="card" style={{ flex: 1, paddingBottom: frame.bottom }}>
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
              title="OTP Verification"
              subTitle="Verify your email address to continue"
            />
            <ResetPasswordForm />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ResetPassword;
