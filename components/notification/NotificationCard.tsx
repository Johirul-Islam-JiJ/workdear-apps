import { Notification } from "@/types/Notification";
import { Feather, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

type NotificationCardProps = {
  item: Notification;
  onRead: (id: number) => Promise<void>;
  isReading: number;
};

const NotificationCard = ({
  item,
  onRead,
  isReading,
}: NotificationCardProps) => {
  const wrapperStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
    width: "95%",
  };
  return (
    <Card color={item.status === "UNREAD" ? "primarydark" : "card"}>
      <View style={wrapperStyle}>
        <AppIcon
          size={20}
          color={item.status === "UNREAD" ? "white" : "primarydark"}
          darkColor="white"
        >
          <FontAwesome name="user-circle-o" />
        </AppIcon>
        <ThemedText color={item.status === "UNREAD" ? "white" : "text"}>
          {item.message}
        </ThemedText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {item.status === "UNREAD" && (
          <Button
            title="Mark as read"
            size="small"
            color="primarydarker"
            onPress={() => onRead(item.id)}
            loading={isReading === item.id}
            startIcon={
              <AppIcon color="white" size={18}>
                <Feather name="check" />
              </AppIcon>
            }
          />
        )}
        <ThemedText
          variant="small"
          color={item.status === "UNREAD" ? "white" : "text"}
          style={{ textAlign: "right", flexGrow: 1 }}
        >
          {new Date(item.created_at).toLocaleDateString("en-BN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </ThemedText>
      </View>
    </Card>
  );
};

export default NotificationCard;
