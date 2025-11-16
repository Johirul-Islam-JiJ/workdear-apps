import { Notification } from "@/types/Notification";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const NotificationCard = ({ item }: { item: Notification }) => {
  return (
    <Card>
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 5 }}>
        <AppIcon size={20} color="primarydark" darkColor="white">
          <FontAwesome name="user-circle-o" />
        </AppIcon>
        <ThemedText>{item.message}</ThemedText>
      </View>
      <ThemedText variant="small" style={{ textAlign: "right" }}>
        {new Date(item.created_at).toLocaleDateString("en-BN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </ThemedText>
    </Card>
  );
};

export default NotificationCard;
