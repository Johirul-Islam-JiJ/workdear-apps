import ChatContent from "@/components/chat/ChatContent";
import { ThemedView } from "@/components/libs/ThemedView";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const Chat = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
