import { config } from "@/config/config";
import { useAppSelector } from "@/hooks/redux";
import { useToast } from "@/hooks/useToast";
import {
  useGetMessageQuery,
  useSaveSupportFileMutation,
} from "@/store/features/liveSupport";
import { ChatHistory, Message } from "@/types/chat";
import { ImagePickerAsset } from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
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
};

const ChatContent = () => {
  const { user } = useAppSelector((state) => state.user);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingWs, setLoadingWs] = useState(true);
  const endContainerRef = useRef(null);
  const ws = useRef<WebSocket | null>(null);
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const [audioBlob, setAudioBlob] = useState<string | null>(null);
  const toast = useToast();
  const { data, isLoading: messageLoading } = useGetMessageQuery(user?.id, {
    skip: !user?.id,
  });
  const [uplaodFile] = useSaveSupportFileMutation();
  const [socketInfo, setSocketInfo] = useState<SocketInfo>({
    conversationId: null,
    adminId: null,
    isAdmin: false,
  });

  const chatContent: ChatHistory = data?.data ?? null;

  async function handleSaveFile(file: ImagePickerAsset) {
    try {
      const formData = new FormData();
      const fileName = file.fileName || `upload_${Date.now()}.jpg`;
      const image = {
        uri: file.uri,
        type: file.mimeType || "image/jpeg",
        name: fileName,
      } as any;
      formData.append("file", image, fileName);
      const res = await uplaodFile(formData).unwrap();
      return res.fileUrl;
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal server error");
    }
  }

  const handleSendMessage = async () => {
    try {
      if (inputValue.trim() === "" && !image && !audioBlob) return;

      setLoading(true);

      // get the admin id with last admin message from chat history
      const adminId = chatHistory
        ? [...chatHistory].reverse().find((msg) => msg.sender_type === "admin")
            ?.sender_id
        : null;

      const payload = {
        message_id: Date.now(),
        conversation_id: socketInfo.conversationId,
        sender_type: "user",
        sender_id: user?.id ?? null,
        admin_id: adminId ?? null,
        message_type: "text",
        message: inputValue,
        status: "sending",
        user_name: user?.name ?? null,
        user_profile: user?.profile_image || null,
        image_url: null,
        voice_url: null,
      } as Message;

      // save image and get link
      if (image) {
        payload.image_url = await handleSaveFile(image);
      }

      if (audioBlob) {
        const fileObject = {
          uri: audioBlob,
          type: "audio/wav",
          fileName: `recording-${Date.now()}.wav`,
        } as any;
        payload.voice_url = await handleSaveFile(fileObject);
      }

      const message = {
        type: "message",
        data: payload,
      };

      ws.current?.send(JSON.stringify(message));
      setChatHistory((prev) => {
        if (prev) return [...prev, payload];
        else return [payload];
      });
      setInputValue("");
      setImage(null);
      setAudioBlob(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatContent && chatContent.messages?.length) {
      setChatHistory([systemMessage, ...chatContent.messages]);
      setSocketInfo((prev) => {
        return {
          ...prev,
          conversationId: chatContent._id,
          adminId: chatContent.admin_id,
        };
      });
    } else {
      setChatHistory([systemMessage]);
    }
  }, [data]);

  //ws
  useEffect(() => {
    if (!user?.id || !config.socketUrl) return;

    (() => {
      try {
        ws.current = new WebSocket(config.socketUrl);

        ws.current.onopen = () => {
          console.log("WebSocket connection established");
          setLoadingWs(false);
          ws.current?.send(
            JSON.stringify({
              type: "init",
              data: {
                userId: user?.id,
                isAdmin: false,
              },
            })
          );
        };

        ws.current.onmessage = (event) => {
          const message = JSON.parse(event.data);

          switch (message.type) {
            case "message-update":
              const conversationId = message.data?.conversation_id;
              if (conversationId) {
                setSocketInfo((prev) => {
                  return { ...prev, conversationId };
                });
              }
              setChatHistory((prev) => {
                return prev.map((item) => {
                  if (item.message_id === message.data?.message_id) {
                    return { ...item, status: message.data.status };
                  }
                  return item;
                });
              });
              break;
            case "message":
              setChatHistory((prev) => {
                return [...prev, message.data];
              });

              break;
            case "read_messages":
              setChatHistory((prev) => {
                return prev.map((item) => {
                  if (
                    message.data?.unreadmessagesId?.includes(item.message_id)
                  ) {
                    return { ...item, status: "seen" };
                  }
                  return item;
                });
              });
              break;
            default:
              break;
          }
        };

        ws.current.onclose = () => {
          console.log("WebSocket connection closed");
        };
      } catch (error) {
        console.error("WebSocket error:", error);
      }
    })();

    return () => {
      ws.current?.close();
    };
  }, [user]);

  if (messageLoading || isLoadingWs) return <LoadingIndicator fullScreen />;
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <ChatBody messages={chatHistory} />
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        isLoading={loading}
        onSendMessage={handleSendMessage}
        onChangeImage={setImage}
        imagePreview={image}
        onChangeAudio={setAudioBlob}
        audioPreview={audioBlob}
      />
    </View>
  );
};

export default ChatContent;
