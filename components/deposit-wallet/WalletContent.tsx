import { PaymentMethodsType, PaymentSystemsType } from "@/types/payment";
import React, { useState } from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import PaymentMethods from "./PaymentMethods";
import PaymentMethodToggleButton from "./PaymentMethodToggleButton";
import WithdrawForm from "./WithdrawForm";

const WalletContent = () => {
  const [paymentMethod, setPaymentMethod] = useState<null | number>(null);
  const [type, setType] = useState<PaymentMethodsType | null>(null);
  const [crypto, setCrypto] = useState(false);

  return (
    <View style={{ padding: 10 }}>
      <PaymentMethodToggleButton onChange={setCrypto} value={crypto} />
      <Card>
        {paymentMethod ? (
          <WithdrawForm
            setPaymentMethod={setPaymentMethod}
            paymentMethodId={paymentMethod}
            type={type}
          />
        ) : (
          <PaymentMethods
            setPaymentMethod={setPaymentMethod}
            setGatewayType={setType}
            title="to withdraw"
            type={PaymentSystemsType.withdrawal}
            crypto={crypto}
          />
        )}
      </Card>
    </View>
  );
};

export default WalletContent;
