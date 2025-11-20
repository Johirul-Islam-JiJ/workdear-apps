import { Message } from "@/types/chat";
import React from "react";
import { FlatList } from "react-native";
import MessageCard from "./MessageCard";

type Props = {
  messages: Message[];
};

const ChatBody = ({ messages }: Props) => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <MessageCard message={item} />}
      contentContainerStyle={{ rowGap: 5, padding: 10 }}
    />
  );
};

export default ChatBody;
