import Container from "@/components/common/Container";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedText } from "@/components/libs/ThemedText";
import useGetPaymentInfo from "@/hooks/useGetPaymentInfo";
import { useGetCurrencyConversationDataQuery } from "@/store/features/payment";
import { useLocalSearchParams } from "expo-router";
import React from "react";
//OP694BCBDC1B

const PaymentDetails = () => {
  const { orderId, type } = useLocalSearchParams();
  const { data, isLoading } = useGetPaymentInfo({
    type: type as string,
    orderId: orderId as string,
  });
  const { data: currencyData } = useGetCurrencyConversationDataQuery();

  if (isLoading) return <LoadingIndicator fullScreen />;

  return (
    <Container>
      <ThemedText>Payment Details {orderId}</ThemedText>
    </Container>
  );
};

export default PaymentDetails;
