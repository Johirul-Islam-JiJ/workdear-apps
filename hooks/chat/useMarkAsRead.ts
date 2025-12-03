import { Message, SocketInfo } from "@/types/chat";
import { useEffect } from "react";

type UseMarkAsReadProps = {
  chatHistory: Message[];
  ws: React.RefObject<WebSocket | null>;
  socketInfo: SocketInfo;
  userId: number | null;
};

export default function useMarkAsRead({
  chatHistory,
  ws,
  socketInfo,
  userId,
}: UseMarkAsReadProps) {
  useEffect(() => {
    // No messages to process
    if (!chatHistory?.length) return;

    // WebSocket not ready
    if (!ws.current || ws.current.readyState !== 1) return;

    // No conversation ID
    if (!socketInfo.conversationId) return;

    // No user ID
    if (!userId) return;

    // Find all unread messages from admin
    const unreadMessageIds = chatHistory
      .filter(
        (msg) =>
          msg.status === "send" &&
          msg.sender_type === "admin" &&
          msg.message_id != null
      )
      .map((msg) => msg.message_id);

    if (!unreadMessageIds.length) return;

    // Find the last admin id from chat history
    const lastAdminMessage = [...chatHistory]
      .reverse()
      .find((msg) => msg.sender_type === "admin");
    const adminId = lastAdminMessage?.sender_id ?? null;

    ws.current.send(
      JSON.stringify({
        type: "unread_messages",
        data: {
          conversation_id: socketInfo.conversationId,
          unreadmessagesId: unreadMessageIds,
          user_id: adminId,
          sender_id: userId,
        },
      })
    );
  }, [chatHistory, ws, socketInfo, userId]);
}
