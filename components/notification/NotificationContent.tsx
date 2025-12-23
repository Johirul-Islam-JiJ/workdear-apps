import { useNotificationManager } from "@/hooks/useNotificationManager";
import { Notification } from "@/types/Notification";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Dimensions, View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import LoadingIndicator from "../libs/LoadingIndicator";
import Pagination from "../libs/Pagination";
import { ThemedText } from "../libs/ThemedText";
import NotificationCard from "./NotificationCard";

const NotificationContent = () => {
  const {
    notifications,
    isLoadingNotifications,
    isLoadingMultipleUpdate,
    isLoadingSingleUpdate,
    handleMarkSingleNotificationAsRead,
    handleMarkAllNotificationAsRead,
    currentPage,
    onchangePage,
    totalPages,
    notificationCount,
  } = useNotificationManager();

  if (isLoadingNotifications)
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );

  return (
    <>
      <View>
        <ThemedText variant="body2" style={{ textAlign: "center" }}>
          Latest Notification
        </ThemedText>
        <ThemedText style={{ textAlign: "center" }}>
          60 days older notifications will be deleted.
        </ThemedText>
      </View>

      <View style={{ rowGap: 5 }}>
        {notifications.length > 0 ? (
          <>
            {notificationCount > 0 && (
              <Button
                title="Mark all as read"
                size="small"
                style={{ alignSelf: "flex-end" }}
                loading={isLoadingMultipleUpdate}
                onPress={handleMarkAllNotificationAsRead}
                startIcon={
                  <AppIcon size={20} color="white">
                    <FontAwesome name="check-circle" />
                  </AppIcon>
                }
              />
            )}
            {notifications.map((notification: Notification, index) => (
              <NotificationCard
                key={index}
                item={notification}
                onRead={handleMarkSingleNotificationAsRead}
                isReading={isLoadingSingleUpdate}
              />
            ))}
          </>
        ) : (
          <View style={{ padding: 10 }}>
            <ThemedText style={{ textAlign: "center" }}>
              No Notification Found
            </ThemedText>
          </View>
        )}
      </View>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={onchangePage}
      />
    </>
  );
};

export default NotificationContent;
