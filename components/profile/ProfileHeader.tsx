import { config } from "@/config/config";
import { useAppSelector } from "@/hooks/redux";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const ProfileHeader = () => {
  const { user } = useAppSelector((state) => state.user);

  const source = user?.profile_image
    ? { uri: config.fileBaseUrl + user.profile_image }
    : require("@/assets/images/default.png");
  return (
    <Card style={{ flexDirection: "row", columnGap: 10 }}>
      <Image
        source={source}
        style={{ height: 80, width: 80, borderRadius: 200 }}
      />
      <View>
        <ThemedText variant="body2">{user?.name}</ThemedText>
        <ThemedText>User ID: {user?.id}</ThemedText>
        <ThemedText variant="small">
          Since{" "}
          {new Date(user?.created_at as string).toLocaleDateString("en-BN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </ThemedText>
      </View>
    </Card>
  );
};

export default ProfileHeader;
