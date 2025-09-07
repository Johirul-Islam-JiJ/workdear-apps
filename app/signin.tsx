import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import React from "react";

const SignIn = () => {
  return (
    <ThemedView
      color="primaryDarker"
      style={{
        height: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/images/logo-white.png")}
        style={{ height: 30, width: 120 }}
        contentFit="contain"
      />
      <ThemedText type="subtitle" color="primaryLighter">
        Welcome back
      </ThemedText>
      <ThemedText color="white">Sign in to continue your journey</ThemedText>
    </ThemedView>
  );
};

export default SignIn;
