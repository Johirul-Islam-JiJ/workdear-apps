import ChatContent from "@/components/chat/ChatContent";
import { ThemedView } from "@/components/libs/ThemedView";
import { useAppSelector } from "@/hooks/redux";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const Chat = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { handleKeyboard } = useAppSelector((state) => state.settings);

  useEffect(() => {
    if (!handleKeyboard) return;

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
  }, [handleKeyboard]);

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
