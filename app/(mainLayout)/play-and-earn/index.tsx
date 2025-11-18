import { ThemedView } from "@/components/libs/ThemedView";
import PlayAndEarnContent from "@/components/play-and-earn/PlayAndEarnContent";
import React from "react";

const PlayAndEarn = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <PlayAndEarnContent />
    </ThemedView>
  );
};

export default PlayAndEarn;
