import { useGetTasksQuery } from "@/store/features/task";
import { MyWork, MyWorkStatus, MyWorkSummaryType } from "@/types/myWork";
import React, { useState } from "react";
import { View } from "react-native";
import MyWorkList from "./MyWorkList";
import MyWorkSummary from "./MyWorkSummary";

const MyWorkContent = ({ Status = "" }: { Status?: MyWorkStatus | "" }) => {
  const [status, setStatus] = useState(Status);
  const [page, setPage] = useState(1);
  const { data: response, isLoading } = useGetTasksQuery({ status, page });

  const data = response?.data?.task;
  const tasks: MyWork[] = data?.data ?? [];
  const totalPages: number = data?.last_page || 1;
  const workSummary: MyWorkSummaryType = response?.data?.statistics || {};

  return (
    <View style={{ rowGap: 10 }}>
      <MyWorkSummary data={workSummary} />
      <MyWorkList />
    </View>
  );
};

export default MyWorkContent;
