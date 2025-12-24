import Container from "@/components/common/Container";
import PaymentContent from "@/components/deposit-wallet/PaymentContent";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { CostName } from "@/types/CostCenter";
import { PaymentSystemsType } from "@/types/payment";
import React from "react";

const Deposit = () => {
  const fee = useGetCostFromCostCenter(CostName.deposit_fee_gateway_percentage);

  return (
    <Container>
      <PaymentContent
        fee={fee}
        formType="deposit"
        type={PaymentSystemsType.deposit}
        title="to deposit"
      />
    </Container>
  );
};

export default Deposit;
