import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";

const MoreScreen = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ThemedText>More</ThemedText>
    </ThemedView>
  );
};

export default MoreScreen;
