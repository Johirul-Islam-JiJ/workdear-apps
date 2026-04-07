import {
  TopJobPoster,
  TopRefferer,
  TopUser,
  TopWorker,
} from "@/types/top-ranking";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import TopWorkerCard from "../top-ranking/TopWorkerCard";

type Props = {
  topJobPoster: TopJobPoster | undefined;
  topWorker: TopWorker | undefined;
  topUser: TopUser | undefined;
  topRefferer: TopRefferer | undefined;
};

const RankPresentar = ({
  topJobPoster,
  topWorker,
  topUser,
  topRefferer,
}: Props) => {
  console.log({
    topJobPoster,
    topWorker,
    topUser,
    topRefferer,
  });
  return (
    <View>
      {topUser && (
        <TopWorkerCard
          item={topUser as any}
          rank={1}
          work={topUser?.total_earnings}
          Icon={<Feather name="dollar-sign" />}
        />
      )}
    </View>
  );
};

export default RankPresentar;
