import { useMyJobsData } from "@/hooks/useMyJobsData";
import { MyJob, MyJobStatistics } from "@/types/myJobs";
import { Link } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";
import Button from "../libs/Button";
import LoadingIndicator from "../libs/LoadingIndicator";
import Pagination from "../libs/Pagination";
import { ThemedText } from "../libs/ThemedText";
import FilterAndHeader from "./FilterAndHeader";
import MyJobSummary from "./MyJobSummary";
import MyjobsList from "./MyjobsList";

const MyJobContent = () => {
  const { data, isLoading, page, setStatus, setPage, status } = useMyJobsData();

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

  if (jobs.length === 0 && status === "") {
    return (
      <View
        style={{
          height: Dimensions.get("screen").height - 140,
          justifyContent: "center",
          alignItems: "center",
          rowGap: 5,
        }}
      >
        <ThemedText>No job found</ThemedText>
        <Link href="/(mainLayout)/(drawer)/(tabs)/post-job" asChild>
          <Button
            title="Add your first job"
            size="small"
            endIcon="arrow-up-right-box-outline"
          />
        </Link>
      </View>
    );
  }

  return (
    <>
      <MyJobSummary data={reports} />
      <FilterAndHeader onChangeStatus={setStatus} />
      <MyjobsList data={jobs} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </>
  );
};

export default MyJobContent;
