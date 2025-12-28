import Container from "@/components/common/Container";
import TabNavigation from "@/components/transactions/TabNavigation";
import React, { useState } from "react";

const TransactionHistory = () => {
  const [showDeposit, setShowDeposit] = useState(true);

  return (
    <Container>
      <TabNavigation onChange={setShowDeposit} value={showDeposit} />
    </Container>
  );
};

export default TransactionHistory;
