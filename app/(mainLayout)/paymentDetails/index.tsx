import Container from "@/components/common/Container";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import AccountDetails from "@/components/paymentDetails/AccountDetails";
import PaymentDetailsInfo from "@/components/paymentDetails/PaymentDetailsInfo";
import PaymentStatus from "@/components/paymentDetails/PaymentStatus";
import useGetPaymentInfo from "@/hooks/useGetPaymentInfo";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const PaymentDetails = () => {
  const { orderId, type } = useLocalSearchParams();
  const { data, isLoading } = useGetPaymentInfo({
    type: type as string,
    orderId: orderId as string,
  });

  if (isLoading) return <LoadingIndicator fullScreen />;

  return (
    <Container>
      <PaymentStatus data={data} />
      <PaymentDetailsInfo data={data} />
      <AccountDetails data={data} />
    </Container>
  );
};

export default PaymentDetails;
