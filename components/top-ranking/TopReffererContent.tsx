import { useGetUserByCatagoryQuery } from "@/store/features/top-user-catagory";
import { TopRefferer } from "@/types/top-ranking";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import NoDataFound from "./NoDataFound";
import TopWorkerCard from "./TopWorkerCard";

const TopReffererContent = () => {
  const { data: response, isLoading } = useGetUserByCatagoryQuery(undefined);

  if (isLoading) {
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );
  }

  const topRefferer: TopRefferer[] = response?.data?.top_referrers ?? [];

  if (topRefferer.length === 0) {
    return <NoDataFound message="There is no refferer history found" />;
  }

  return (
    <>
      {topRefferer.map((item, index) => (
        <TopWorkerCard
          key={index}
          item={item as any}
          rank={index + 1}
          work={item.referral_count}
          Icon={<MaterialIcons name="room-preferences" />}
        />
      ))}
    </>
  );
};

export default TopReffererContent;
