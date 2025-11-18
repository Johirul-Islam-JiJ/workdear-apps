import { PaymentMethodsType } from "@/types/payment";
import React from "react";
import { View } from "react-native";

type Props = {
  setPaymentMethod: React.Dispatch<React.SetStateAction<number | null>>;
  paymentMethodId: number;
  type: PaymentMethodsType | null;
};

const WithdrawForm = ({ setPaymentMethod, paymentMethodId, type }: Props) => {
  return <View></View>;
};

export default WithdrawForm;
