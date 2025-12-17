import useJobReview from "@/hooks/useJobReview";
import React, { useState } from "react";
import { View } from "react-native";

const MyJobDetailsContent = () => {
  const { jobSubmissions, page, setPage } = useJobReview();
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
        .filter((item) => item.status === "UNDER_REVIEW")
        .map((item) => item.id);
      setSelectedTaskIds(allIds);
      setIsAllSelected(true);
    }
  };

  return <View></View>;
};

export default MyJobDetailsContent;
