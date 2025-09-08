import Banner from "@/components/home/Banner";
import { ThemedText } from "@/components/libs/ThemedText";
import React from "react";
import { View } from "react-native";

const HomeSreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Banner />
      <ThemedText>Home</ThemedText>
    </View>
  );
};

export default HomeSreen;
