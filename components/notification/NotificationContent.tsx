import { useGetNotificationQuery } from "@/store/features/notification";
import { Notification } from "@/types/Notification";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import Pagination from "../libs/Pagination";
import { ThemedText } from "../libs/ThemedText";
import NotificationCard from "./NotificationCard";

const NotificationContent = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetNotificationQuery({
    status: "",
    page: page,
  });

  if (isLoading)
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );

  const notifications: Notification[] = data?.data?.data;

  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 15, rowGap: 10 }}>
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
          notifications.map((notification: Notification, index) => (
            <NotificationCard key={index} item={notification} />
          ))
        ) : (
          <View style={{ padding: 10 }}>
            <ThemedText style={{ textAlign: "center" }}>
              No Notification Found
            </ThemedText>
          </View>
        )}
      </View>
      <Pagination
        currentPage={data?.data?.current_page || 1}
        totalPages={data?.data?.last_page || 1}
        onChange={setPage}
      />
    </View>
  );
};

export default NotificationContent;
