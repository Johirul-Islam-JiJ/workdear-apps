import React from "react";
import { View } from "react-native";
import Button from "../libs/Button";

type Props = {
  onChange: (value: boolean) => void;
  value: boolean;
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
        variant={value ? "contained" : "outlined"}
        onPress={() => onChange(true)}
        style={{
          borderRadius: 0,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      />
      <Button
        title="Withdrawal"
        variant={!value ? "contained" : "outlined"}
        onPress={() => onChange(false)}
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
