import { config } from "@/config/config";
import { Message } from "@/types/chat";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import VoicePlayer from "../libs/VoicePlayer";

type Props = {
  message: Message;
};

const MessageCard = ({ message }: Props) => {
  return (
    <View
      style={[style.container, message.sender_type === "user" && style.reverse]}
    >
      {message.sender_type === "admin" && (
        <View>
          {message.admin_profile ? (
            <Image
              source={{ uri: config.fileBaseUrl + message.admin_profile }}
              style={style.profile}
            />
          ) : (
            <ThemedView color="primarydark" style={style.profileIcon}>
              <ThemedText variant="subtitle" color="white">
                {message.admin_name?.charAt(0) || "A"}
              </ThemedText>
            </ThemedView>
          )}
        </View>
      )}
      <View>
        {message.image_url ? (
          <Image source={{ uri: message.image_url }} style={style.image} />
        ) : message.message ? (
          <ThemedView color="card" style={style.message}>
            <ThemedText>{message.message}</ThemedText>
          </ThemedView>
        ) : message.voice_url ? (
          <VoicePlayer uri={message.voice_url} />
        ) : null}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 5,
    flexDirection: "row",
  },
  reverse: {
    flexDirection: "row-reverse",
  },
  image: { width: 200, height: 100, borderRadius: 8 },
  message: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  profileIcon: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageCard;
