import { useGetUserByCatagoryQuery } from "@/store/features/top-user-catagory";
import { TopUser } from "@/types/top-ranking";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Dimensions, View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import TopWorkerCard from "./TopWorkerCard";

const TopUserContent = () => {
  const { data: response, isLoading } = useGetUserByCatagoryQuery(undefined);

  if (isLoading) {
    return (
      <LoadingIndicator
        fullScreen
        style={{ height: Dimensions.get("screen").height - 100 }}
      />
    );
  }

  const topUsers: TopUser[] = response?.data?.top_users ?? [];
  return (
    <View style={{ padding: 10, rowGap: 5 }}>
      {topUsers.map((item, index) => (
        <TopWorkerCard
          key={index}
          item={item}
          rank={index + 1}
          work={item.total_earnings}
          Icon={<Feather name="dollar-sign" />}
        />
      ))}
    </View>
  );
};

export default TopUserContent;
