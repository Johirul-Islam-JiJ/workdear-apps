import ChatContent from "@/components/chat/ChatContent";
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
    <View
      style={{
        height: Dimensions.get("screen").height - 85,
        paddingBottom: keyboardHeight,
      }}
    >
      <ChatContent />
    </View>
  );
};

export default Chat;
