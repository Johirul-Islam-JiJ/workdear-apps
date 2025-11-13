import { ThemedView } from "@/components/libs/ThemedView";
import MyWorkContent from "@/components/my-work/MyWorkContent";
import React from "react";

const MyWorkScreen = () => {
  return (
    <ThemedView color="background" style={{ flex: 1, rowGap: 10, padding: 10 }}>
      <MyWorkContent />
    </ThemedView>
  );
};

export default MyWorkScreen;
