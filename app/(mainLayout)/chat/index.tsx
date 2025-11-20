import ChatContent from "@/components/chat/ChatContent";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";

const Chat = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ChatContent />
    </ThemedView>
  );
};

export default Chat;
