import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { ThemedView } from "@/components/libs/ThemedView";
import RankPresentar from "@/components/rank/RankPresentar";
import { useAppSelector } from "@/hooks/redux";
import { useGetUserByCatagoryQuery } from "@/store/features/top-user-catagory";
import {
  TopJobPoster,
  TopRefferer,
  TopUser,
  TopWorker,
} from "@/types/top-ranking";
import React from "react";
import { ScrollView } from "react-native";

const Rank = () => {
  const { data: response, isLoading } = useGetUserByCatagoryQuery(undefined);
  const { user } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <LoadingIndicator fullScreen />;
  }
  const topUsers: TopUser[] = response?.data?.top_users ?? [];
  const topRefferers: TopRefferer[] = response?.data?.top_referrers;
  const topJobPosters: TopJobPoster[] = response?.data?.top_job_providers ?? [];
  const topWorkers: TopWorker[] = response?.data?.top_workers ?? [];

  const topUser = topUsers.find((item) => item.user_name === user?.username);
  const topRefferer = topRefferers.find(
    (item) => item.user_name === user?.username,
  );
  const topJobPoster = topJobPosters.find(
    (item) => item.user_name === user?.username,
  );
  const topWorker = topWorkers.find(
    (item) => item.user_name === user?.username,
  );
  return (
    <ThemedView style={{ flex: 1 }} color="background">
      <ScrollView style={{ flex: 1 }}>
        <RankPresentar
          topJobPoster={topJobPoster}
          topRefferer={topRefferer}
          topUser={topUser}
          topWorker={topWorker}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default Rank;
