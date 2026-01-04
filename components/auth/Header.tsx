import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { Image } from "expo-image";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = ({ title, subTitle }: { title: string; subTitle: string }) => {
  const frame = useSafeAreaInsets();

  return (
    <ThemedView
      color="primarydark"
      darkColor="primarydarker"
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: frame.top,
        paddingBottom: 15,
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
