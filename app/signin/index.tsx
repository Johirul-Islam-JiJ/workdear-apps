import Header from "@/components/auth/Header";
import SignInForm from "@/components/auth/SignInForm";
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

const SignIn = () => {
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
              title="Welcome back"
              subTitle="You have been missed, Good to see you again!"
            />

            <SignInForm />
            <View
              style={{
                marginTop: "auto",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                padding: 10,
                gap: 4,
              }}
            >
              <ThemedText>Don’t have an account?</ThemedText>
              <Link href="/signup">
                <ThemedText variant="link">Sign up</ThemedText>
              </Link>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default SignIn;
