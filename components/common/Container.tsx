import React from "react";
import { ScrollView, View } from "react-native";
import { ThemedView } from "../libs/ThemedView";

type Props = { children: React.ReactNode; rowGap?: number; padding?: number };

const Container = ({ children, rowGap = 10, padding = 10 }: Props) => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding, rowGap }}>{children}</View>
      </ScrollView>
    </ThemedView>
  );
};

export default Container;
