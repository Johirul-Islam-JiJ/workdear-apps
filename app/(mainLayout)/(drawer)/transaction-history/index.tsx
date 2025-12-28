import Container from "@/components/common/Container";
import TabNavigation from "@/components/transactions/TabNavigation";
import TransactionHistoryList from "@/components/transactions/TransactionHistoryList";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import React, { useState } from "react";

export type TransactionType = "deposit" | "withdrawal";

const TransactionHistory = () => {
  const [type, setType] = useState<TransactionType>("deposit");
  const { page, setPage, status, setStatus, transactions, isLoading } =
    useTransactionHistory({ type: type });

  return (
    <Container>
      <TabNavigation onChange={setType} value={type} />
      <TransactionHistoryList data={transactions} />
    </Container>
  );
};

export default TransactionHistory;
