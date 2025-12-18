import { useGetUserByCatagoryQuery } from "@/store/features/top-user-catagory";
import { TopRefferer } from "@/types/top-ranking";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, View } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
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

  const topRefferer: TopRefferer[] = response?.data?.top_referrers;
  return (
    <View style={{ padding: 10, rowGap: 5 }}>
      {topRefferer.map((item, index) => (
        <TopWorkerCard
          key={index}
          item={item as any}
          rank={index + 1}
          work={item.referral_count}
          Icon={<MaterialIcons name="room-preferences" />}
        />
      ))}
    </View>
  );
};

export default TopReffererContent;
