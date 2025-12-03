import { config } from "@/config/config";
import { Message } from "@/types/chat";
import { useEffect, useRef, useState } from "react";

type UseChatSocketProps = {
  userId: number | null;
  onMessage?: (msg: Message) => void;
  onMessageUpdate?: (msg: Message) => void;
  onReadMessages?: (msgIds: number[]) => void;
  onTyping?: (isTyping: boolean) => void;
};

export const useChatSocket = ({
  userId,
  onMessage,
  onMessageUpdate,
  onReadMessages,
  onTyping,
}: UseChatSocketProps) => {
  const ws = useRef<WebSocket | null>(null);
  const [loadingWs, setLoadingWs] = useState(true);

  useEffect(() => {
    if (!userId || !config.socketUrl) return;

    ws.current = new WebSocket(config.socketUrl);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      setLoadingWs(false);
      ws.current?.send(
        JSON.stringify({ type: "init", data: { userId, isAdmin: false } })
      );
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "message-update":
          onMessageUpdate?.(message.data);
          break;
        case "message":
          onMessage?.(message.data);
          break;
        case "read_messages":
          onReadMessages?.(message.data?.unreadmessagesId || []);
          break;
        case "typing":
          onTyping?.(message.data?.is_typing || false);
          break;
        default:
          break;
      }
    };

    ws.current.onclose = () => console.log("WebSocket closed");

    return () => ws.current?.close();
  }, [userId]);

  const sendMessage = (message: any) => {
    ws.current?.send(JSON.stringify(message));
  };

  return { ws, sendMessage, loadingWs };
};
