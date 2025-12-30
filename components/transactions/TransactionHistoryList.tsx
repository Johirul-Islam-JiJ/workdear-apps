import { TransactionHistory } from "@/types/payment";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import TransactionHistoryCard from "./TransactionHistoryCard";

const TransactionHistoryList = ({ data }: { data: TransactionHistory[] }) => {
  if (!data?.length)
    return (
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <ThemedText color="gray.800" darkColor="gray.300" variant="body">
          No transaction found
        </ThemedText>
      </View>
    );

  return (
    <View style={{ rowGap: 6 }}>
      {data?.map((transaction, index) => (
        <TransactionHistoryCard key={index} transaction={transaction} />
      ))}
    </View>
  );
};

export default TransactionHistoryList;
