import { TransactionHistory } from "@/types/payment";
import React from "react";
import { View } from "react-native";
import Badge from "../libs/Badge";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  transaction: TransactionHistory;
};

const TransactionHistoryCard = ({ transaction }: Props) => {
  const status = transaction.status?.toLowerCase();
  return (
    <Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <ThemedText variant="subtitle">
            {transaction.amount} {transaction.currency}
          </ThemedText>
          <ThemedText variant="small">
            {new Date(transaction.created_at).toLocaleDateString("en-BN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </ThemedText>
        </View>
        <View>
          <Badge
            label={status}
            style={{ borderRadius: 5 }}
            color={
              /success|accepted/.test(status)
                ? "success"
                : status === "failed"
                ? "error"
                : "warning"
            }
          />
        </View>
      </View>
      <View>
        <ThemedText style={{ textTransform: "capitalize" }}>
          Payment Method: {transaction.payment_system?.replaceAll("_", " ")}
        </ThemedText>
        <ThemedText>Transaction ID: {transaction.transaction_id}</ThemedText>
      </View>
    </Card>
  );
};

export default TransactionHistoryCard;
