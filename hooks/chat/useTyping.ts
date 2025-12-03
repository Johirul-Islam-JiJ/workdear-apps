import { SocketInfo } from "@/types/chat";
import { useCallback, useRef } from "react";

type UseTypeingProps = {
  ws: React.RefObject<WebSocket | null>;
  socketInfo: SocketInfo;
  userId: number | null;
};

export default function useTyping({ ws, socketInfo, userId }: UseTypeingProps) {
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef<boolean>(false);

  const handleSendTyping = useCallback(
    (typing: boolean) => {
      if (ws?.current?.readyState !== 1) return;
      const payload = {
        type: "typing",
        data: {
          conversation_id: socketInfo.conversationId,
          sender_type: "user",
          sender_id: userId,
          receiver_id: socketInfo.adminId,
          is_typing: typing,
        },
      };
      ws.current.send(JSON.stringify(payload));
    },
    [ws, socketInfo, userId]
  );

  const handleTypingStart = useCallback(() => {
    if (!isTypingRef.current) {
      handleSendTyping(true);
      isTypingRef.current = true;
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      if (ws?.current?.readyState === 1) {
        handleSendTyping(false);
        isTypingRef.current = false;
      }
    }, 2000);
  }, [handleSendTyping, ws]);

  const resetTyping = useCallback(() => {
    isTypingRef.current = false;
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  }, []);

  return { handleTypingStart, resetTyping };
}
