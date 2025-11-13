import { ThemedView } from "@/components/libs/ThemedView";
import MyWorkContent from "@/components/my-work/MyWorkContent";
import React from "react";
import { ScrollView } from "react-native";

const MyWorkScreen = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <MyWorkContent />
      </ScrollView>
    </ThemedView>
  );
};

export default MyWorkScreen;
