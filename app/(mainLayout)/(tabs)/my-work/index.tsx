import { ThemedView } from "@/components/libs/ThemedView";
import MyWorkList from "@/components/my-work/MyWorkList";
import React from "react";

const MyWorkScreen = () => {
  return (
    <ThemedView color="background" style={{ flex: 1, rowGap: 10, padding: 10 }}>
      {/* <MyWorkReport /> */}
      <MyWorkList />
    </ThemedView>
  );
};

export default MyWorkScreen;
