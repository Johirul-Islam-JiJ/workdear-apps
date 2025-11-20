import React from "react";
import { ViewStyle } from "react-native";
import IconButton from "../libs/IconButton";
import Input from "../libs/Input";
import { ThemedView } from "../libs/ThemedView";

const ChatInput = () => {
  const wrapperStyle: ViewStyle = {
    paddingTop: 15,
    padding: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  };
  return (
    <ThemedView color="card" style={wrapperStyle}>
      <Input placeholder="Enter your message" />
      <IconButton icon="image" color="primarydark" />
      <IconButton icon="mic" color="primarydark" />
      <IconButton icon="send-sharp" color="primarydark" />
    </ThemedView>
  );
};

export default ChatInput;
