import Button from "@/components/libs/Button";
import Divider from "@/components/libs/Divider";
import IconButton from "@/components/libs/IconButton";
import { ThemedText } from "@/components/libs/ThemedText";
import React from "react";
import { Alert, View } from "react-native";

export default function DrawerFooter() {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {},
      },
    ]);
  };

  return (
    <View style={{ paddingHorizontal: 8 }}>
      <Divider />

      <Button
        onPress={handleLogout}
        title="Logout"
        color="error"
        variant="soft"
        size="large"
        style={{ justifyContent: "space-between" }}
        startIcon={
          <IconButton icon="log-out-outline" color="error" size="sm" />
        }
        endIcon="chevron-forward"
      />

      {/* App Version */}
      <ThemedText
        variant="small"
        color="gray.700"
        style={{ textAlign: "center", marginTop: 10, marginBottom: 5 }}
      >
        VERSION: 1.0.0
      </ThemedText>
    </View>
  );
}
