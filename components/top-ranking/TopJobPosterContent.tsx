import { useGetUserByCatagoryQuery } from "@/store/features/top-user-catagory";
import { TopJobPoster } from "@/types/top-ranking";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import TopWorkerCard from "./TopWorkerCard";

const TopJobPosterContent = () => {
  const { data: response, isLoading } = useGetUserByCatagoryQuery(undefined);

  if (isLoading) {
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );
  }

  const topJobPoster: TopJobPoster[] = response?.data?.top_job_providers ?? [];

  return (
    <View style={{ padding: 10, rowGap: 5 }}>
      {topJobPoster.map((item, index) => (
        <TopWorkerCard
          key={index}
          item={item as any}
          rank={index + 1}
          work={item.job_posted_count}
          Icon={<MaterialIcons name="work-history" />}
        />
      ))}
    </View>
  );
};

export default TopJobPosterContent;
