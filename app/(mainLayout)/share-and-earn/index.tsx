import { ThemedView } from "@/components/libs/ThemedView";
import ShareAndEarnContent from "@/components/share-and-earn/ShareAndEarnContent";
import React from "react";

const ShareAndEarn = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ShareAndEarnContent />
    </ThemedView>
  );
};

export default ShareAndEarn;
