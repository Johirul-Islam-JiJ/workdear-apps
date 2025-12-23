import LoadingIndicator from "@/components/libs/LoadingIndicator";
import Pagination from "@/components/libs/Pagination";
import useJobReview from "@/hooks/useJobReview";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import JobSubmissionList from "./JobSubmissionList";
import NaviagionHeader from "./NaviagionHeader";
import SingleMyJobSummary from "./SingleMyJobSummary";

const MyJobDetailsContent = () => {
  const { jobSubmissions, basicJobInfo, page, setPage, setStatus, isLoading } =
    useJobReview();
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);

  const handleSingleSelect = (id: number) => {
    if (selectedTaskIds.includes(id)) {
      setSelectedTaskIds((prev) =>
        prev.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedTaskIds((prev) => [...prev, id]);
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
    <>
      <SingleMyJobSummary data={basicJobInfo} />
      <NaviagionHeader
        setStatus={setStatus}
        selectedTaskIds={selectedTaskIds}
        setSelectedTaskIds={setSelectedTaskIds}
      />
      <JobSubmissionList
        jobSubmissions={jobSubmissions.data}
        onSelect={handleSingleSelect}
        selectedTaskIds={selectedTaskIds}
      />
      <Pagination
        currentPage={page}
        onChange={setPage}
        totalPages={jobSubmissions.last_page ?? 1}
      />
    </>
  );
};

export default MyJobDetailsContent;
