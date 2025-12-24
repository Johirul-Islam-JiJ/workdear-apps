import { PaymentInfo } from "@/types/payment";
import React from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import { TextVariant, ThemedText } from "../libs/ThemedText";

const PaymentDetailsInfo = ({ data }: { data: PaymentInfo }) => {
  const list = [
    {
      title: "Tnx ID:",
      value: data.transaction_report.transaction_id,
      variant: "body",
    },
    {
      title: "Customer ID:",
      value: data.user.id,
      variant: "body",
    },
    {
      title: "Amount:",
      value: `$${data.transaction_report.amount}`,
      variant: "subtitle",
    },
    {
      title: "Payment method",
      value: data.transaction_report.payment_system,
      variant: "body",
    },
    {
      title: "Transaction Date",
      value: new Date(data.transaction_report.created_at).toLocaleDateString(
        "en-BN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }
      ),
      variant: "body",
    },
  ];
  return (
    <Card style={{ rowGap: 5 }}>
      <ThemedText variant="body2">Payment details</ThemedText>
      {list.map((item, index) => (
        <View key={index}>
          <ThemedText darkColor="gray.400" color="gray.500">
            {item.title}
          </ThemedText>
          <ThemedText variant={item.variant as TextVariant}>
            {item.value}
          </ThemedText>
        </View>
      ))}
    </Card>
  );
};

export default PaymentDetailsInfo;
