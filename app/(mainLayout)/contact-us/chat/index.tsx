import ChatContent from "@/components/chat/ChatContent";
import { ThemedView } from "@/components/libs/ThemedView";
import useKeyboardHeight from "@/hooks/useKeyboardHeight";
import React from "react";

const Chat = () => {
  const keyboardHeight = useKeyboardHeight();

  return (
    <ThemedView
      color="background"
      style={{ flex: 1, marginBottom: keyboardHeight }}
    >
      <ChatContent />
    </ThemedView>
  );
};

export default Chat;
