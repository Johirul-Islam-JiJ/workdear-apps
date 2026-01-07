import Header from "@/components/auth/Header";
import OtpForm from "@/components/auth/OtpForm";
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

const Otp = () => {
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
            <OtpForm />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default Otp;
