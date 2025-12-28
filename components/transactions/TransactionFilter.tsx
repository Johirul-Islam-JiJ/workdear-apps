import { PaymentStatusType } from "@/types/payment";
import React from "react";
import { View } from "react-native";
import { DropdownMenu } from "../libs/DropdownMenu";

type Props = {
  status: PaymentStatusType | "";
  setStatus: (status: PaymentStatusType | "") => void;
};

const TransactionFilter = ({ status, setStatus }: Props) => {
  const statusOptions = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Success", value: "success" },
    { label: "Failed", value: "failed" },
    { label: "Rejected", value: "rejected" },
    { label: "Accepted", value: "accepted" },
    { label: "Completed", value: "completed" },
    { label: "Hold", value: "hold" },
    { label: "Refund", value: "refund" },
  ];

  return (
    <View>
      <DropdownMenu
        items={statusOptions}
        value={status}
        onSelect={(value) => setStatus(value as PaymentStatusType)}
        placeholder="Filter by status"
        border
      />
    </View>
  );
};

export default TransactionFilter;
