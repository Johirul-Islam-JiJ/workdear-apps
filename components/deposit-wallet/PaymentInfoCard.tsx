import { config } from "@/config/config";
import { PaymentMethod, PaymentMethodsType } from "@/types/payment";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

type Props = {
  paymentMethod: PaymentMethod;
  formType: "deposit" | "withdrawal";
  fee: number;
  conversionRate: string;
};

const PaymentInfoCard = ({
  paymentMethod,
  formType,
  fee,
  conversionRate,
}: Props) => {
  let range = "";
  if (formType === "deposit") {
    range = `${paymentMethod.min_deposit ?? 0} - ${paymentMethod.max_deposit}`;
  } else if (formType === "withdrawal") {
    range = `${paymentMethod.min_withdrawals ?? 0} - ${
      paymentMethod.max_withdrawals
    }`;
  }

  return (
    <ThemedView
      color="gray.200"
      style={{ padding: 10, borderRadius: 8, rowGap: 10 }}
    >
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <ThemedView color="gray.300" style={{ borderRadius: 10, padding: 5 }}>
          <Image
            source={{ uri: config.fileBaseUrl + paymentMethod.image_url }}
            style={{ height: 60, width: 60 }}
            contentFit="contain"
          />
        </ThemedView>
        <View>
          <ThemedText variant="body2" style={{ textTransform: "capitalize" }}>
            {paymentMethod.name.split("_")[0]}
          </ThemedText>
          <ThemedText variant="small">
            {paymentMethod.network ?? paymentMethod.description}
          </ThemedText>
        </View>
      </View>

      <ThemedView color="gray.300" style={{ padding: 10, borderRadius: 8 }}>
        <ThemedText
          style={{ textTransform: "capitalize", fontWeight: "bold" }}
          color="gray.600"
          variant="small"
        >
          {formType} range
        </ThemedText>
        <ThemedText variant="small">
          {range}({paymentMethod.currency})
        </ThemedText>
        <ThemedText style={{ textTransform: "capitalize" }} variant="small">
          {formType} Fee:{" "}
          <ThemedText color="warning" variant="small">
            {fee}%
          </ThemedText>
        </ThemedText>
        {paymentMethod.type === PaymentMethodsType.passimpay && (
          <ThemedText variant="small">
            Network Fee:{" "}
            <ThemedText color="warning" variant="small">
              {paymentMethod.fee_network}%
            </ThemedText>
          </ThemedText>
        )}
        {paymentMethod.type === PaymentMethodsType.apay ? (
          <ThemedText variant="small" color="warning">
            1 USD = {parseFloat(conversionRate).toFixed(4)}{" "}
            {paymentMethod.currency}
          </ThemedText>
        ) : (
          <ThemedText variant="small" color="warning">
            1 {paymentMethod.currency} ={" "}
            {parseFloat(paymentMethod.rate_usd || "0").toFixed(4)} USD
          </ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
};

export default PaymentInfoCard;
