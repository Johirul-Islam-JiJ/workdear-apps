import { countryCurrency, countryCurrencyPattern } from "@/_mock/payment";
import useGetSingleGateWay from "@/hooks/useGetSingleGateWay";
import { useGetCurrencyConversationDataQuery } from "@/store/features/payment";
import { PaymentMethod } from "@/types/payment";
import React from "react";
import { View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import Header from "./Header";
import PaymentForm from "./PaymentForm";
import PaymentInfoCard from "./PaymentInfoCard";

type Props = {
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod | null>>;
  paymentMethod: PaymentMethod;
  formType: "deposit" | "withdrawal";
  fee: number;
  onSubmit: (data: any) => void;
  isPaymentLoading: boolean;
};

const PaymentDetails = ({
  setPaymentMethod,
  paymentMethod,
  formType,
  fee,
  onSubmit,
  isPaymentLoading,
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
      <Header
        clearPaymentMethod={setPaymentMethod}
        name={paymentMethod.name}
        formType={formType}
      />
      <PaymentInfoCard
        paymentMethod={data}
        formType={formType}
        fee={fee}
        conversionRate={conversionRate ?? "0"}
      />
      <PaymentForm
        paymentMethod={data}
        formType={formType}
        currency={currency}
        conversionRate={conversionRate ?? "0"}
        fee={fee}
        onSubmit={onSubmit}
        isLoading={isPaymentLoading}
      />
    </View>
  );
};

export default PaymentDetails;
