import React from "react";
import { View } from "react-native";
import Button from "../libs/Button";

const PaymentMethodToggleButton = ({
  onChange,
  value,
}: {
  onChange: (value: boolean) => void;
  value: boolean;
}) => {
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
        title="E-wallet"
        variant={!value ? "contained" : "outlined"}
        onPress={() => onChange(false)}
        style={{
          borderRadius: 0,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      />
      <Button
        title="Crypto"
        variant={value ? "contained" : "outlined"}
        onPress={() => onChange(true)}
        style={{
          borderRadius: 0,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
      />
    </View>
  );
};

export default PaymentMethodToggleButton;
