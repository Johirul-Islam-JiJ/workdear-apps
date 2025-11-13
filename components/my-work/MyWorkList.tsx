import { useGetTasksQuery } from "@/store/features/task";
import { MyWork, MyWorkStatus, MyWorkSummary } from "@/types/myWork";
import React, { useState } from "react";
import { ViewStyle } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const MyWorkList = ({ Status = "" }: { Status?: MyWorkStatus | "" }) => {
  const [status, setStatus] = useState(Status);
  const [page, setPage] = useState(1);
  const { data: response, isLoading } = useGetTasksQuery({ status, page });

  const data = response?.data?.task;
  const tasks: MyWork[] = data?.data ?? [];
  const totalPages: number = data?.last_page || 1;
  const statistics: MyWorkSummary = response?.data?.statistics || {};

  const containerStyle: ViewStyle = {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  };
  return (
    <ThemedView color="card" style={containerStyle}>
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        Your submissions
      </ThemedText>
    </ThemedView>
  );
};

export default MyWorkList;
