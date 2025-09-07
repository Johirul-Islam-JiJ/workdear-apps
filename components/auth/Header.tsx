import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { Image } from "expo-image";
import React from "react";

const Header = ({ title }: { title: string }) => {
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
      <ThemedText color="white">{title}</ThemedText>
    </ThemedView>
  );
};

export default Header;
