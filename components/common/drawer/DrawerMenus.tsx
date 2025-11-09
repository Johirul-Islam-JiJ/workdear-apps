import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../../libs/ThemedText";

interface DrawerQuickActionsProps {
  navigation: DrawerContentComponentProps["navigation"];
}

export default function DrawerMenus({ navigation }: DrawerQuickActionsProps) {
  return (
    <View style={style.quickActionsSection}>
      <Pressable
        style={style.actionButton}
        onPress={() => navigation.navigate("Withdraw")}
      >
        <View style={style.actionButtonLeft}>
          <View style={[style.actionIcon, { backgroundColor: "#10b98120" }]}>
            <Ionicons name="cash-outline" size={20} color="#10b981" />
          </View>
          <ThemedText style={style.actionButtonText}>Withdraw</ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </Pressable>

      <Pressable
        style={style.actionButton}
        onPress={() => navigation.navigate("Deposit")}
      >
        <View style={style.actionButtonLeft}>
          <View style={[style.actionIcon, { backgroundColor: "#3b82f620" }]}>
            <Ionicons name="add-circle-outline" size={20} color="#3b82f6" />
          </View>
          <ThemedText style={style.actionButtonText}>Add Deposit</ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </Pressable>

      <Pressable
        style={style.actionButton}
        onPress={() => navigation.navigate("TransactionHistory")}
      >
        <View style={style.actionButtonLeft}>
          <View style={[style.actionIcon, { backgroundColor: "#8b5cf620" }]}>
            <Ionicons name="receipt-outline" size={20} color="#8b5cf6" />
          </View>
          <ThemedText style={style.actionButtonText}>
            Transaction History
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </Pressable>

      <Pressable
        style={style.actionButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <View style={style.actionButtonLeft}>
          <View style={[style.actionIcon, { backgroundColor: "#6b728020" }]}>
            <Ionicons name="settings-outline" size={20} color="#6b7280" />
          </View>
          <ThemedText style={style.actionButtonText}>Settings</ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  quickActionsSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginBottom: 4,
  },
  actionButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
  },
});
