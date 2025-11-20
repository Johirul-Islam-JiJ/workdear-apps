import { useAppSelector } from "@/hooks/redux";
import { useGetMessageQuery } from "@/store/features/liveSupport";
import { ChatHistory, Message } from "@/types/chat";
import React, { useEffect, useRef, useState } from "react";
import { View, ViewStyle } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

type SocketInfo = {
  conversationId: string | null;
  adminId: number | null;
  isAdmin: boolean;
};

const systemMessage: Message = {
  _id: "system",
  admin_id: null,
  createdAt: "",
  image_url: null,
  message: "Hello, how can I help you today?",
  message_id: 0,
  message_type: "text",
  sender_id: 0,
  sender_type: "system",
  status: "seen",
  user_id: null,
  user_online: true,
  voice_url: null,
  admin_profile: null,
  admin_name: null,
};

const ChatContent = () => {
  const { user } = useAppSelector((state) => state.user);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState(true);
  const endContainerRef = useRef(null);
  const [socketInfo, setSocketInfo] = useState<SocketInfo>({
    conversationId: null,
    adminId: null,
    isAdmin: false,
  });
  const { data, isLoading: messageLoading } = useGetMessageQuery(user?.id, {
    skip: !user?.id,
  });

  const chatContent: ChatHistory = data?.data ?? null;

  useEffect(() => {
    if (chatContent && chatContent.messages.length) {
      setChatHistory([systemMessage, ...chatContent.messages]);
      setSocketInfo((prev) => {
        return {
          ...prev,
          conversationId: chatContent._id,
          adminId: chatContent.admin_id,
        };
      });
    }
  }, [data]);

  const containerStyle: ViewStyle = {
    justifyContent: "space-between",
    flex: 1,
  };

  if (messageLoading) return <LoadingIndicator fullScreen />;
  return (
    <View style={containerStyle}>
      <ChatBody messages={chatHistory} />
      <ChatInput />
    </View>
  );
};

export default ChatContent;
