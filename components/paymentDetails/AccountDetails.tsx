import { PaymentInfo } from "@/types/payment";
import React from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import Divider from "../libs/Divider";
import { ThemedText } from "../libs/ThemedText";

const AccountDetails = ({ data }: { data: PaymentInfo }) => {
  const list = [
    {
      title: "Account holder",
      value: data.user.name,
    },
    {
      title: "Email",
      value: data.user.email,
    },
  ];
  return (
    <Card style={{ rowGap: 5 }}>
      <ThemedText variant="body2">Account information</ThemedText>
      {list.map((item, index) => (
        <View key={index}>
          <ThemedText darkColor="gray.400" color="gray.500">
            {item.title}
          </ThemedText>
          <ThemedText>{item.value}</ThemedText>
        </View>
      ))}
      <Divider style={{ marginVertical: 10 }} />
      <View>
        <ThemedText darkColor="gray.400" color="gray.500">
          Current deposit balance
        </ThemedText>
        <ThemedText variant="subtitle">${data.user.deposit_balance}</ThemedText>
      </View>
      {data.transaction_report.status === "success" && (
        <View>
          <ThemedText darkColor="gray.400" color="gray.500">
            Amount Added
          </ThemedText>
          <ThemedText variant="subtitle" color="success">
            +{data.user.deposit_in_wallet}$
          </ThemedText>
        </View>
      )}
    </Card>
  );
};

export default AccountDetails;
