import ChatContent from "@/components/chat/ChatContent";
import { ThemedView } from "@/components/libs/ThemedView";
import React from "react";
import { ScrollView } from "react-native";

const Chat = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ChatContent />
      </ScrollView>
    </ThemedView>
  );
};

export default Chat;
