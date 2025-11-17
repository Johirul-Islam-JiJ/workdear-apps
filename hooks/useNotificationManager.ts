import {
  useGetNotificationCountQuery,
  useGetNotificationQuery,
  useMarkMultipleNotificationsAsReadMutation,
  useMarkSingleNotificationAsReadMutation,
} from "@/store/features/notification";
import { Notification } from "@/types/Notification";
import { useState } from "react";
import { useToast } from "./useToast";

export const useNotificationManager = () => {
  const [page, setPage] = useState(1);
  const { data: notificationCount } = useGetNotificationCountQuery();
  const { data, isLoading } = useGetNotificationQuery({
    page: page,
  });
  const [markSingleNotificationAsRead] =
    useMarkSingleNotificationAsReadMutation();
  const [markAllNotificationAsRead, { isLoading: isLoadingMultipleUpdate }] =
    useMarkMultipleNotificationsAsReadMutation();
  const [singleUpdating, setSingleUpdating] = useState(-1);
  const toast = useToast();

  const notifications: Notification[] = data?.data?.data ?? [];
  const totalPages: number = data?.data?.last_page || 1;

  async function handleMarkSingleNotificationAsRead(id: number) {
    try {
      setSingleUpdating(id);
      await markSingleNotificationAsRead(id).unwrap();
      toast.success("Notification marked as read");
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal server error");
    } finally {
      setSingleUpdating(-1);
    }
  }

  async function handleMarkAllNotificationAsRead() {
    try {
      const notificationIds = notifications.map(
        (notification) => notification.id
      );
      if (!notificationIds || notificationIds.length === 0) return;
      await markAllNotificationAsRead(notificationIds).unwrap();
      toast.success("All notifications marked as read");
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal server error");
    }
  }

  return {
    notifications: notifications,
    isLoadingNotifications: isLoading,
    isLoadingMultipleUpdate,
    isLoadingSingleUpdate: singleUpdating,
    handleMarkSingleNotificationAsRead,
    handleMarkAllNotificationAsRead,
    currentPage: page,
    onchangePage: setPage,
    totalPages,
    notificationCount: notificationCount?.data?.unread_count || 0,
  };
};
