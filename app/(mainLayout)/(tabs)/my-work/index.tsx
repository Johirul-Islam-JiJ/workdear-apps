import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";

const MyWorkScreen = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ThemedText>My Work</ThemedText>
    </ThemedView>
  );
};

export default MyWorkScreen;
