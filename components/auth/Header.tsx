import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { Image } from "expo-image";
import React from "react";

const Header = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <ThemedView
      color="primarydark"
      darkColor="primarydarker"
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
        variant="subtitle"
        color="white"
        style={{ marginBottom: 5, marginTop: 5 }}
      >
        {title}
      </ThemedText>
      <ThemedText color="white" style={{ textAlign: "center" }}>
        {subTitle}
      </ThemedText>
    </ThemedView>
  );
};

export default Header;
