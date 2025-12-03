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
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={(item, index) => item._id || index.toString()}
      renderItem={({ item, index }) => (
        <MessageCard message={item} isLast={index === messages.length - 1} />
      )}
      ListFooterComponent={
        isTyping ? (
          <View style={{ alignItems: "flex-start" }}>
            <LoadingIndicator />
          </View>
        ) : null
      }
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
