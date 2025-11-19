import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { CostName } from "@/types/CostCenter";
import { PaymentMethod, PaymentSystemsType } from "@/types/payment";
import React, { useState } from "react";
import { View } from "react-native";
import Card from "../libs/Card";
import PaymentMethods from "./PaymentMethods";
import PaymentMethodToggleButton from "./PaymentMethodToggleButton";
import WithdrawForm from "./WithdrawForm";

const WalletContent = () => {
  const [paymentMethod, setPaymentMethod] = useState<null | PaymentMethod>(
    null
  );
  const [crypto, setCrypto] = useState(false);
  const fee = useGetCostFromCostCenter(
    CostName.withdrawal_fee_gateway_percentage
  );

  return (
    <View style={{ padding: 10 }}>
      <PaymentMethodToggleButton onChange={setCrypto} value={crypto} />
      <Card>
        {paymentMethod ? (
          <WithdrawForm
            setPaymentMethod={setPaymentMethod}
            paymentMethod={paymentMethod}
            formType="withdrawal"
            fee={fee}
          />
        ) : (
          <PaymentMethods
            setPaymentMethod={setPaymentMethod}
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
