import ChatContent from "@/components/chat/ChatContent";
import { ThemedView } from "@/components/libs/ThemedView";
import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, View } from "react-native";

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
    <ThemedView style={{ flex: 1 }} color="background">
      <View
        style={{
          height: Dimensions.get("screen").height - 85,
          paddingBottom: keyboardHeight,
        }}
      >
        <ChatContent />
      </View>
    </ThemedView>
  );
};

export default Chat;
