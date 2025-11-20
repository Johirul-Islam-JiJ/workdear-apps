import React from "react";
import { Dimensions, View, ViewStyle } from "react-native";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

const ChatContent = () => {
  const containerStyle: ViewStyle = {
    justifyContent: "space-between",
    height: Dimensions.get("screen").height - 91,
  };
  return (
    <View style={containerStyle}>
      <ChatBody />
      <ChatInput />
    </View>
  );
};

export default ChatContent;
