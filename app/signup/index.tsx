import Header from "@/components/auth/Header";
import SignUpForm from "@/components/auth/SignUpForm";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { Link } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SignUp = () => {
  return (
    <ThemedView color="card" style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            {/* Header */}
            <Header
              title="Let's get started"
              subTitle="Sign up with your real information"
            />

            {/* Form */}
            <SignUpForm />

            {/* Footer */}
            <View
              style={{
                marginTop: "auto",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                paddingVertical: 16,
              }}
            >
              <ThemedText>Already have an account?</ThemedText>
              <Link href="/signin">
                <ThemedText variant="link" underline>
                  Login
                </ThemedText>
              </Link>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default SignUp;
