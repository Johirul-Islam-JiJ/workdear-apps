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

  useEffect(() => {
    if (messages.length > 0) {
      listRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages, isTyping]);

  return (
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{ padding: 10, rowGap: 5 }}
      renderItem={({ item, index }) => (
        <MessageCard message={item} isLast={index === messages.length - 1} />
      )}
      ListFooterComponent={
        isTyping ? (
          <View
            style={{
              alignItems: "flex-start",
              paddingHorizontal: 15,
              paddingBottom: 10,
            }}
          >
            <LoadingIndicator />
          </View>
        ) : null
      }
      onContentSizeChange={() =>
        listRef.current?.scrollToEnd({ animated: true })
      }
    />
  );
};

export default ChatBody;
