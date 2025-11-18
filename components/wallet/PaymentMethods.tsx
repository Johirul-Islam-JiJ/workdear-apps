import { countryCurrency } from "@/_mock/payment";
import { useAppSelector } from "@/hooks/redux";
import { filterByCountry } from "@/services/filterByCountry";
import { useGetPaymentSystemsQuery } from "@/store/features/payment";
import { PaymentMethodsType, PaymentSystemsType } from "@/types/payment";
import React from "react";
import { View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  setPaymentMethod: React.Dispatch<React.SetStateAction<number | null>>;
  title: string;
  type: PaymentSystemsType;
  setGatewayType: React.Dispatch<
    React.SetStateAction<PaymentMethodsType | null>
  >;
  crypto: boolean;
  setCrypto: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentMethods = ({
  setPaymentMethod,
  title,
  type,
  setGatewayType,
  crypto,
  setCrypto,
}: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetPaymentSystemsQuery(undefined);

  if (isLoading) return <LoadingIndicator />;

  if (!data) return null;

  const filteredData = filterByCountry(
    data,
    user?.country as keyof typeof countryCurrency,
    type,
    crypto
  );

  return (
    <View>
      <ThemedText variant="body2">Choose payment method {title}</ThemedText>
    </View>
  );
};

export default PaymentMethods;
