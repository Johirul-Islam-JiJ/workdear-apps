export interface NotificationCount {
  data: {
    unread_count: number;
  };
}

export interface Notification {
  id: number;
  created_at: string;
  message: string;
  status: string;
  type: string;
}
