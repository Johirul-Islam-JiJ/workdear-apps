import { useGetTasksQuery } from "@/store/features/my-work";
import { MyWork, MyWorkSummaryType } from "@/types/myWork";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import Button from "../libs/Button";
import LoadingIndicator from "../libs/LoadingIndicator";
import Pagination from "../libs/Pagination";
import { ThemedText } from "../libs/ThemedText";
import MyWorkList from "./MyWorkList";
import MyWorkSummary from "./MyWorkSummary";

const MyWorkContent = () => {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const { data: response, isLoading } = useGetTasksQuery({ status, page });

  const data = response?.data?.task;
  const tasks: MyWork[] = data?.data ?? [];
  const totalPages: number = data?.last_page || 1;
  const workSummary: MyWorkSummaryType = response?.data?.statistics || {};

  if (isLoading) {
    return (
      <LoadingIndicator
        fullScreen
        style={{
          height: Dimensions.get("screen").height - 140,
        }}
      />
    );
  }

  if (tasks.length === 0) {
    return (
      <View
        style={{
          height: Dimensions.get("screen").height - 140,
          justifyContent: "center",
          alignItems: "center",
          rowGap: 5,
        }}
      >
        <ThemedText>No work found</ThemedText>
        <Link href="/(mainLayout)/(drawer)/(tabs)/jobs" asChild>
          <Button
            title="Find your first work"
            size="small"
            endIcon="arrow-up-right-box-outline"
          />
        </Link>
      </View>
    );
  }

  return (
    <View style={{ rowGap: 20, padding: 10 }}>
      <MyWorkSummary data={workSummary} />
      <MyWorkList onChangeStatus={setStatus} data={tasks} />
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onChange={setPage}
      />
    </View>
  );
};

export default MyWorkContent;
