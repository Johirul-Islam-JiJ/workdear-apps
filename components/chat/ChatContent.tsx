import { useChatSocket } from "@/hooks/chat/useChatSocket";
import { useChatState } from "@/hooks/chat/useChatState";
import useMarkAsRead from "@/hooks/chat/useMarkAsRead";
import useTyping from "@/hooks/chat/useTyping";
import { useUploadFile } from "@/hooks/chat/useUploadFile";
import { useAppSelector } from "@/hooks/redux";
import { useGetMessageQuery } from "@/store/features/liveSupport";
import React, { useState } from "react";
import { View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

const ChatContent = () => {
  const { user } = useAppSelector((state) => state.user);
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState<any | null>(null);
  const [audioBlob, setAudioBlob] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { data, isLoading: messageLoading } = useGetMessageQuery(user?.id, {
    skip: !user?.id,
  });
  const { chatHistory, setChatHistory, socketInfo, setSocketInfo } =
    useChatState(data?.data ?? null);
  const { handleUploadFile } = useUploadFile();

  const { sendMessage, loadingWs, ws } = useChatSocket({
    userId: user?.id ?? null,
    onMessage: (msg) => {
      setIsTyping(false);
      setChatHistory((prev) => [...prev, msg]);
    },
    onMessageUpdate: (msg) => {
      const conversationId = msg?.conversation_id;
      if (conversationId) {
        setSocketInfo((prev) => ({ ...prev, conversationId }));
      }
      setChatHistory((prev) =>
        prev.map((m) =>
          m.message_id === msg.message_id ? { ...m, status: msg.status } : m
        )
      );
    },
    onReadMessages: (msgIds) =>
      setChatHistory((prev) =>
        prev.map((m) =>
          msgIds.includes(m.message_id) ? { ...m, status: "seen" } : m
        )
      ),
    onTyping: (isTyping) => setIsTyping(isTyping),
  });

  const { handleTypingStart, resetTyping } = useTyping({
    socketInfo,
    userId: user?.id ?? null,
    ws,
  });

  useMarkAsRead({
    userId: user?.id ?? null,
    chatHistory,
    ws,
    socketInfo,
  });

  const handleSend = async () => {
    if (!inputValue.trim() && !image && !audioBlob) return;
    setLoading(true);

    const adminId =
      chatHistory
        ?.slice()
        .reverse()
        .find((msg) => msg.sender_type === "admin")?.sender_id ?? null;

    const payload = {
      message_id: Date.now(),
      conversation_id: socketInfo.conversationId,
      sender_type: "user",
      sender_id: user?.id ?? null,
      admin_id: adminId,
      message_type: "text",
      message: inputValue,
      status: "sending",
      user_name: user?.name ?? null,
      user_profile: user?.profile_image ?? null,
      image_url: image ? await handleUploadFile(image) : null,
      voice_url: audioBlob
        ? await handleUploadFile({ uri: audioBlob, type: "audio/wav" })
        : null,
    } as any;

    sendMessage({ type: "message", data: payload });
    setChatHistory((prev) => [...prev, payload]);
    setInputValue("");
    setImage(null);
    setAudioBlob(null);
    setLoading(false);
    resetTyping();
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    handleTypingStart();
  };

  if (messageLoading || loadingWs) return <LoadingIndicator fullScreen />;

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <ChatBody messages={chatHistory} isTyping={isTyping} />
      <ChatInput
        value={inputValue}
        onChange={handleInputChange}
        isLoading={loading}
        onSendMessage={handleSend}
        onChangeImage={setImage}
        imagePreview={image}
        onChangeAudio={setAudioBlob}
        audioPreview={audioBlob}
      />
    </View>
  );
};

export default ChatContent;
