import {
  useGetDepositTransactionHistoryQuery,
  useGetWithdrawTransactionHistoryQuery,
} from "@/store/features/payment";
import { PaymentStatusType, TransactionHistory } from "@/types/payment";
import { useState } from "react";

type Params = {
  type: "deposit" | "withdrawal";
};

type data = {
  transactions: TransactionHistory[];
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  status: PaymentStatusType | "";
  setStatus: (status: PaymentStatusType | "") => void;
};

export const useTransactionHistory = ({ type }: Params): data => {
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<PaymentStatusType | "">("");
  const { data: deposits, isLoading: depositLoading } =
    useGetDepositTransactionHistoryQuery({
      page,
      status,
    });
  const { data: withdrawals, isLoading: withdrawalLoading } =
    useGetWithdrawTransactionHistoryQuery({
      page,
      status,
    });

  return {
    transactions: type === "deposit" ? deposits?.data : withdrawals?.data || [],
    isLoading: type === "deposit" ? depositLoading : withdrawalLoading,
    page,
    setPage,
    status,
    setStatus,
  };
};
