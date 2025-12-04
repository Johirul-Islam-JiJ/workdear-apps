import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { ScrollView, View } from "react-native";

const MyJobs = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, rowGap: 10 }}>
          <ThemedText>My Jobs</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default MyJobs;
