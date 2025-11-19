import { countryCurrency, countryCurrencyPattern } from "@/_mock/payment";
import useGetSingleGateWay from "@/hooks/useGetSingleGateWay";
import { useGetCurrencyConversationDataQuery } from "@/store/features/payment";
import { PaymentMethod } from "@/types/payment";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppIcon from "../libs/AppIcon";
import Button from "../libs/Button";
import LoadingIndicator from "../libs/LoadingIndicator";
import { ThemedText } from "../libs/ThemedText";
import PaymentInfoCard from "./PaymentInfoCard";

type Props = {
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod | null>>;
  paymentMethod: PaymentMethod;
  formType: "deposit" | "withdrawal";
  fee: number;
};

const WithdrawForm = ({
  setPaymentMethod,
  paymentMethod,
  formType,
  fee,
}: Props) => {
  const { data: currencyData } = useGetCurrencyConversationDataQuery(undefined);
  const { data, isLoading } = useGetSingleGateWay({
    id: paymentMethod.id,
    type: paymentMethod.type,
  });

  const currency = countryCurrencyPattern.test(paymentMethod.currency)
    ? paymentMethod.currency
    : "USD";
  const conversionRate = currencyData?.find(
    (c) => c.to_currency === currency && c.from_currency === countryCurrency.US
  )?.rate;

  if (isLoading) return <LoadingIndicator />;

  return (
    <View style={{ rowGap: 10 }}>
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
          {paymentMethod.name.split("_")[0]} withdraw
        </ThemedText>
        <Button
          title="Go back"
          onPress={() => setPaymentMethod(null)}
          variant="outlined"
          size="small"
          startIcon={
            <AppIcon color="primarydark" size={20}>
              <Feather name="chevron-left" />
            </AppIcon>
          }
        />
      </View>
      <PaymentInfoCard
        paymentMethod={data}
        formType={formType}
        fee={fee}
        conversionRate={conversionRate ?? "0"}
      />
    </View>
  );
};

export default WithdrawForm;
