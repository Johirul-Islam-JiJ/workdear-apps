import { PaymentMethod } from "@/types/payment";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";

type props = {
  name: string;
  clearPaymentMethod: (value: PaymentMethod | null) => void;
  formType: "deposit" | "withdrawal";
};

const Header = ({ name, clearPaymentMethod, formType }: props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ThemedText
        style={{ textTransform: "capitalize", fontWeight: "bold" }}
        color="primarydark"
      >
        {name.split("_")[0]} {formType}
      </ThemedText>
      <Button
        title="Go back"
        onPress={() => clearPaymentMethod(null)}
        variant="outlined"
        size="small"
        startIcon={
          <AppIcon color="primarydark" size={20}>
            <Feather name="chevron-left" />
          </AppIcon>
        }
      />
    </View>
  );
};

export default Header;
