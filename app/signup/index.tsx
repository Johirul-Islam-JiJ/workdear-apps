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
              subTitle="Sign up with your real information"
              title="Let's get started"
            />
            <SignUpForm />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "auto",
                gap: 4,
                padding: 10,
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
