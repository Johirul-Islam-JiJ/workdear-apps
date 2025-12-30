import Container from "@/components/common/Container";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import Pagination from "@/components/libs/Pagination";
import TabNavigation from "@/components/transactions/TabNavigation";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import TransactionHistoryList from "@/components/transactions/TransactionHistoryList";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import React, { useState } from "react";

export type TransactionType = "deposit" | "withdrawal";

const TransactionHistory = () => {
  const [type, setType] = useState<TransactionType>("deposit");
  const {
    page,
    setPage,
    status,
    setStatus,
    transactions,
    isLoading,
    totalPages,
  } = useTransactionHistory({ type: type });

  if (isLoading) return <LoadingIndicator fullScreen />;

  return (
    <Container>
      <TabNavigation onChange={setType} value={type} />
      <TransactionFilter
        status={status}
        setStatus={setStatus}
        dataLength={transactions?.length || 0}
      />
      <TransactionHistoryList data={transactions} />
      <Pagination
        currentPage={page}
        onChange={setPage}
        totalPages={totalPages}
      />
    </Container>
  );
};

export default TransactionHistory;
