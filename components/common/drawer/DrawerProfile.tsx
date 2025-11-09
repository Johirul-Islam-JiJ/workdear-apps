import Badge from "@/components/libs/Badge";
import { config } from "@/config/config";
import { useAppSelector } from "@/hooks/redux";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../../libs/ThemedText";
import { ThemedView } from "../../libs/ThemedView";

interface DrawerProfileProps {
  navigation: DrawerContentComponentProps["navigation"];
}

export default function DrawerProfile({ navigation }: DrawerProfileProps) {
  const { user } = useAppSelector((state) => state.user);
  const primaryColor = useThemeColor("primarylight");
  const warningColor = useThemeColor("warning");
  const borderColor = useThemeColor("border");

  const source = user?.profile_image
    ? { uri: config.fileBaseUrl + user.profile_image }
    : require("@/assets/images/default.png");

  const isVerified = user?.is_verified;
  const isPremium = user?.is_premium;

  return (
    <ThemedView color="primarydark" style={style.profileContainer}>
      <View style={style.contentWrapper}>
        <View style={style.profileImageContainer}>
          <Image
            style={style.profileImage}
            contentFit="cover"
            source={source}
          />
          {/* Verified Badge */}
          {isVerified && !isPremium && (
            <View style={[style.badge, style.verifiedBadge]}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={primaryColor}
              />
            </View>
          )}
          {/* Premium Badge */}
          {isPremium && (
            <View style={[style.badge, style.premiumBadge]}>
              <Ionicons name="star" size={16} color={warningColor} />
            </View>
          )}
        </View>

        {/* User Info */}
        <View style={style.userInfo}>
          <View style={{ gap: 2 }}>
            <ThemedText color="white" variant="subtitle" numberOfLines={1}>
              {user?.name}
            </ThemedText>

            {/* Status Badges */}
            <View style={style.statusBadges}>
              {isVerified ? (
                <Badge
                  label="Verifed"
                  color="success"
                  icon="checkmark-circle"
                />
              ) : (
                <Badge label="Unverifed" color="warning" icon="warning-sharp" />
              )}

              {isPremium && (
                <Badge label="Premium" color="warning" icon="star" />
              )}
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          style.balanceContainer,
          {
            borderColor: `${borderColor}40`,
            backgroundColor: `${borderColor}30`,
          },
        ]}
      >
        <ThemedText color="white" variant="button">
          Earning: ${user?.wallet_balance.earning_balance}
        </ThemedText>

        <ThemedText color="white" variant="button">
          Deposit: ${user?.wallet_balance.deposit_balance}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const style = StyleSheet.create({
  profileContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
    borderTopEndRadius: 15,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
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
  badge: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verifiedBadge: {
    bottom: -2,
    right: -2,
  },
  premiumBadge: {
    top: -2,
    right: -2,
  },
  userInfo: {
    flex: 1,
    gap: 8,
    paddingTop: 2,
  },

  statusBadges: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },

  balanceContainer: {
    borderRadius: 10,
    padding: 10,
    gap: 6,
    borderWidth: 1,
  },
});
