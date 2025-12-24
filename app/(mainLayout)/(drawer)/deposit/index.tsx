import Container from "@/components/common/Container";
import WalletContent from "@/components/deposit-wallet/WalletContent";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { CostName } from "@/types/CostCenter";
import { PaymentSystemsType } from "@/types/payment";
import React from "react";

const Deposit = () => {
  const fee = useGetCostFromCostCenter(CostName.deposit_fee_gateway_percentage);

  return (
    <Container>
      <WalletContent
        fee={fee}
        formType="deposit"
        type={PaymentSystemsType.deposit}
        title="to deposit"
      />
    </Container>
  );
};

export default Deposit;
