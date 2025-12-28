import { TransactionHistory } from "@/types/payment";
import React from "react";
import { View } from "react-native";
import TransactionHistoryCard from "./TransactionHistoryCard";

const TransactionHistoryList = ({ data }: { data: TransactionHistory[] }) => {
  return (
    <View style={{ rowGap: 6 }}>
      {data?.map((transaction, index) => (
        <TransactionHistoryCard key={index} transaction={transaction} />
      ))}
    </View>
  );
};

export default TransactionHistoryList;
