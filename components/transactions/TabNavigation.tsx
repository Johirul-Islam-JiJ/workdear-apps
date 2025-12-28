import { TransactionType } from "@/app/(mainLayout)/(drawer)/transaction-history";
import React from "react";
import { View } from "react-native";
import Button from "../libs/Button";

type Props = {
  onChange: (value: TransactionType) => void;
  value: TransactionType;
};

const TabNavigation = ({ onChange, value }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Button
        title="Deposit"
        variant={value === "deposit" ? "contained" : "outlined"}
        onPress={() => onChange("deposit")}
        style={{
          borderRadius: 0,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      />
      <Button
        title="Withdrawal"
        variant={value === "withdrawal" ? "contained" : "outlined"}
        onPress={() => onChange("withdrawal")}
        style={{
          borderRadius: 0,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
      />
    </View>
  );
};

export default TabNavigation;
