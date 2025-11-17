import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React from "react";
import { View, ViewStyle } from "react-native";
import { ThemedText } from "../libs/ThemedText";

const Banner = () => {
  const bannerWrapper: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  };

  return (
    <View style={{ position: "relative" }}>
      <Image
        source={{ uri: "https://www.workdear.com/support-image.png" }}
        style={{ width: "100%", height: 200 }}
      />
      <BlurView intensity={50} style={bannerWrapper}>
        <ThemedText variant="h3" color="white">
          WorkDear Support Centre
        </ThemedText>
        <ThemedText
          variant="body"
          color="white"
          style={{ textAlign: "center" }}
        >
          We know that questions can come up at any time, and we're always here
          to help.
        </ThemedText>
        <ThemedText
          variant="body"
          color="primarylighter"
          style={{ fontWeight: "bold", marginTop: 10 }}
        >
          24/7 Customer Support
        </ThemedText>
      </BlurView>
    </View>
  );
};

export default Banner;
