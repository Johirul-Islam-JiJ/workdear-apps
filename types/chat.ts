export type Message = {
  _id: string;
  admin_id: number | null;
  conversation_id: string | null;
  createdAt: string;
  image_url: string | null;
  message: string;
  message_id: number;
  message_type: "text" | "image" | "voice";
  sender_id: number | null;
  sender_type: "user" | "admin" | "system";
  status: "seen" | "send" | "sending";
  user_id: number | null;
  user_online: boolean;
  voice_url: string | null;
  admin_profile: string | null;
  admin_name: string | null;
  user_name: string | null;
  user_profile: string | null;
};

export type ChatHistory = {
  _id: string;
  admin_id: number | null;
  createdAt: string;
  messages: Message[];
  status: "active" | "pending" | "closed";
  unread_count: number;
  updatedAt: string;
  user_id: number;
  user_name: string;
  user_profile: string;
};

export type SocketInfo = {
  conversationId: string | null;
  adminId: number | null;
  isAdmin: boolean;
};
