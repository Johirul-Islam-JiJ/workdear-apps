import { config } from "@/config/config";
import { useAppSelector } from "@/hooks/redux";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../libs/Button";
import { ThemedText } from "../../libs/ThemedText";
import { ThemedView } from "../../libs/ThemedView";

interface DrawerProfileProps {
  navigation: DrawerContentComponentProps["navigation"];
}

export default function DrawerProfile({ navigation }: DrawerProfileProps) {
  const { user } = useAppSelector((state) => state.user);
  const primaryColor = useThemeColor("primarylight");

  const source = user?.profile_image
    ? { uri: config.fileBaseUrl + user.profile_image }
    : require("@/assets/images/default.png");

  const isVerified = user?.is_verified;

  const handleViewProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <ThemedView color="primarydark" style={style.profileContainer}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={style.profileImageContainer}>
          <Image
            style={style.profileImage}
            contentFit="cover"
            source={source}
          />
          {isVerified && (
            <View style={style.verifiedBadge}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={primaryColor}
              />
            </View>
          )}
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <View style={{ gap: 4 }}>
            <ThemedText color="white" variant="subtitle" numberOfLines={1}>
              {user?.name || "Guest User"}
            </ThemedText>
          </View>
          <Button
            title="View Profile"
            variant="contained"
            color="primarydarker"
            size="small"
            onPress={handleViewProfile}
            startIcon={<Ionicons name="eye" size={16} color="white" />}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const style = StyleSheet.create({
  profileContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 10,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff20",
    borderWidth: 2,
    borderColor: "#ffffff30",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 2,
  },
});
