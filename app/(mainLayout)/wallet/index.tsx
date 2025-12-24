import Container from "@/components/common/Container";
import PaymentContent from "@/components/deposit-wallet/PaymentContent";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { CostName } from "@/types/CostCenter";
import { PaymentSystemsType } from "@/types/payment";
import React from "react";

const Wallet = () => {
  const fee = useGetCostFromCostCenter(
    CostName.withdrawal_fee_gateway_percentage
  );

  return (
    <Container>
      <PaymentContent
        fee={fee}
        formType="withdrawal"
        type={PaymentSystemsType.withdrawal}
        title="to withdraw"
      />
    </Container>
  );
};

export default Wallet;
