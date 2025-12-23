import { useGetUserByCatagoryQuery } from "@/store/features/top-user-catagory";
import { TopWorker } from "@/types/top-ranking";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import TopWorkerCard from "./TopWorkerCard";

const TopWorkerContent = () => {
  const { data: response, isLoading } = useGetUserByCatagoryQuery(undefined);

  if (isLoading) {
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );
  }

  const topWorkers: TopWorker[] = response?.data?.top_workers ?? [];

  return (
    <>
      {topWorkers.map((item, index) => (
        <TopWorkerCard
          key={index}
          item={item}
          rank={index + 1}
          work={item.satisfied_count}
          Icon={<MaterialIcons name="work" />}
        />
      ))}
    </>
  );
};

export default TopWorkerContent;
