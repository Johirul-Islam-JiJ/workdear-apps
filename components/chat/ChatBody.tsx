import { Message } from "@/types/chat";
import React, { useEffect, useRef } from "react";
import { FlatList } from "react-native";
import MessageCard from "./MessageCard";

type Props = {
  messages: Message[];
};

const ChatBody = ({ messages }: Props) => {
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
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={(item, index) => item._id || index.toString()}
      renderItem={({ item }) => <MessageCard message={item} />}
      contentContainerStyle={{ rowGap: 5, padding: 10 }}
      inverted={false}
      windowSize={21}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={10}
      style={{ flex: 1 }}
      onContentSizeChange={() => {
        listRef.current?.scrollToEnd({ animated: false });
      }}
    />
  );
};

export default ChatBody;
