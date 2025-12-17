import { useMyJobsData } from "@/hooks/useMyJobsData";
import { MyJob, MyJobStatistics } from "@/types/myJobs";
import React from "react";
import { Dimensions, View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import Pagination from "../libs/Pagination";
import FilterAndHeader from "./FilterAndHeader";
import MyJobSummary from "./MyJobSummary";
import MyjobsList from "./MyjobsList";

const MyJobContent = () => {
  const { data, isLoading, page, setStatus, setPage } = useMyJobsData();

  const jobs: MyJob[] = data?.data?.data?.jobs || [];
  const totalPages: number = data?.data?.last_page || 1;
  const reports: MyJobStatistics = data?.data?.data?.statistics || {};

  if (isLoading)
    return (
      <LoadingIndicator
        fullScreen
        style={{
          height: Dimensions.get("screen").height - 140,
        }}
      />
    );

  return (
    <View style={{ padding: 10, rowGap: 10 }}>
      <MyJobSummary data={reports} />
      <FilterAndHeader onChangeStatus={setStatus} />
      <MyjobsList data={jobs} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </View>
  );
};

export default MyJobContent;
