import { ThemedView } from "@/components/libs/ThemedView";
import WalletContent from "@/components/wallet/WalletContent";
import React from "react";
import { ScrollView } from "react-native";

const Wallet = () => {
  return (
    <ThemedView color="background" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <WalletContent />
      </ScrollView>
    </ThemedView>
  );
};

export default Wallet;
