import { ThemedView } from "@/components/libs/ThemedView";
import ShareAndEarnContent from "@/components/share-and-earn/ShareAndEarnContent";
import React from "react";
import { ScrollView } from "react-native";

const ShareAndEarn = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ShareAndEarnContent />
      </ScrollView>
    </ThemedView>
  );
};

export default ShareAndEarn;
