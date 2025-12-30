import { Message } from "@/types/chat";
import React, { useEffect, useRef } from "react";
import { FlatList, View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import MessageCard from "./MessageCard";

type Props = {
  messages: Message[];
  isTyping: boolean;
};

const ChatBody = ({ messages, isTyping }: Props) => {
  const listRef = useRef<FlatList>(null);

  const initial = useRef(true);

  useEffect(() => {
    if (messages.length === 0) return;

    if (initial.current) {
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: false });
      }, 50);
      initial.current = false;
    } else {
      listRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={{ rowGap: 5, padding: 10 }}>
      {messages.map((message, index) => (
        <MessageCard
          key={index}
          message={message}
          isLast={index === messages.length - 1}
        />
      ))}

      {isTyping && (
        <View
          style={{
            alignItems: "flex-start",
            paddingHorizontal: 15,
            paddingBottom: 10,
          }}
        >
          <LoadingIndicator />
        </View>
      )}
    </View>
  );
};

export default ChatBody;
