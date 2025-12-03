import { ChatHistory, Message, SocketInfo } from "@/types/chat";
import { useEffect, useState } from "react";

export const useChatState = (initialData: ChatHistory | null) => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [socketInfo, setSocketInfo] = useState<SocketInfo>({
    conversationId: null,
    adminId: null,
    isAdmin: false,
  });

  useEffect(() => {
    if (initialData && initialData.messages?.length) {
      setChatHistory([
        {
          _id: "system",
          admin_id: null,
          conversation_id: null,
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
          user_name: null,
          user_profile: null,
        },
        ...initialData.messages,
      ]);

      setSocketInfo({
        conversationId: initialData._id,
        adminId: initialData.admin_id,
        isAdmin: false,
      });
    } else {
      setChatHistory([
        {
          _id: "system",
          admin_id: null,
          conversation_id: null,
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
          user_name: null,
          user_profile: null,
        },
      ]);
    }
  }, [initialData]);

  return { chatHistory, setChatHistory, socketInfo, setSocketInfo };
};
