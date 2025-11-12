import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { useAppSelector } from "@/hooks/redux";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function DrawerBalance() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <ThemedView style={style.balanceSection}>
      <View style={style.balanceGrid}>
        {/* Earning Card */}
        <View style={[style.balanceCard, style.earningCard]}>
          <View style={style.balanceHeader}>
            <View style={[style.iconContainer, style.earningIcon]}>
              <Ionicons name="trending-up" size={16} color="#10b981" />
            </View>
            <ThemedText style={style.balanceLabel}>Earning</ThemedText>
          </View>
          <ThemedText style={style.balanceAmount}>
            {user?.wallet_balance?.earning_balance || "0.0000"}
          </ThemedText>
          <ThemedText style={style.balanceSubtext}>Available</ThemedText>
        </View>

        {/* Deposit Card */}
        <View style={[style.balanceCard, style.depositCard]}>
          <View style={style.balanceHeader}>
            <View style={[style.iconContainer, style.depositIcon]}>
              <Ionicons name="wallet" size={16} color="#3b82f6" />
            </View>
            <ThemedText style={style.balanceLabel}>Deposit</ThemedText>
          </View>
          <ThemedText style={style.balanceAmount}>
            {user?.wallet_balance?.deposit_balance || "0.0000"}
          </ThemedText>
          <ThemedText style={style.balanceSubtext}>Available</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const style = StyleSheet.create({
  balanceSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  balanceGrid: {
    gap: 12,
  },
  balanceCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  earningCard: {
    backgroundColor: "#f0fdf4",
    borderColor: "#d1fae5",
  },
  depositCard: {
    backgroundColor: "#eff6ff",
    borderColor: "#dbeafe",
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  earningIcon: {
    backgroundColor: "#d1fae5",
  },
  depositIcon: {
    backgroundColor: "#dbeafe",
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6b7280",
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  balanceSubtext: {
    fontSize: 10,
    color: "#9ca3af",
  },
});
