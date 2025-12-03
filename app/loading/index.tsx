import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";

const loading = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ThemedView color="primarydark" style={{ height: 35 }} />
      <LoadingIndicator fullScreen />
    </ThemedView>
  );
};

export default loading;
