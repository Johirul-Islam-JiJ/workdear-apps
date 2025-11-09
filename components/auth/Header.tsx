import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { Image } from "expo-image";
import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <ThemedView
      color="primarydark"
      style={{
        height: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/images/logo-white.png")}
        style={{ height: 50, width: 160 }}
        contentFit="contain"
      />
      <ThemedText
        type="title"
        color="white"
        style={{ marginBottom: 5, marginTop: 5 }}
      >
        Welcome back
      </ThemedText>
      <ThemedText color="white">{title}</ThemedText>
    </ThemedView>
  );
};

export default Header;
