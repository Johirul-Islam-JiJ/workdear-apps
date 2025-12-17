import LoadingIndicator from "@/components/libs/LoadingIndicator";
import useJobReview from "@/hooks/useJobReview";
import { TaskStatus } from "@/types/myJobs";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import NaviagionHeader from "./NaviagionHeader";
import SingleMyJobSummary from "./SingleMyJobSummary";

const MyJobDetailsContent = () => {
  const { jobSubmissions, basicJobInfo, page, setPage, setStatus, isLoading } =
    useJobReview();
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleClerSelectedId = () => {
    setSelectedTaskIds([]);
    setIsAllSelected(false);
  };

  const handleSingleSelect = (id: number) => {
    if (selectedTaskIds.includes(id)) {
      setSelectedTaskIds((prev) =>
        prev.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedTaskIds((prev) => [...prev, id]);
    }
  };

  const handleToggleSelectAll = () => {
    const submissions = jobSubmissions?.data;
    if (!submissions?.length) return;
    if (isAllSelected) {
      setSelectedTaskIds([]);
      setIsAllSelected(false);
    } else {
      const allIds = submissions
        .filter((item) => item.status === TaskStatus.UNDER_REVIEW)
        .map((item) => item.id);
      setSelectedTaskIds(allIds);
      setIsAllSelected(true);
    }
  };

  if (isLoading)
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );

  return (
    <View style={{ rowGap: 10, padding: 10 }}>
      <SingleMyJobSummary data={basicJobInfo} />
      <NaviagionHeader setStatus={setStatus} />
    </View>
  );
};

export default MyJobDetailsContent;
