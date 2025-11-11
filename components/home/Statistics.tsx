import { useAppSelector } from "@/hooks/redux";
import React from "react";
import { View } from "react-native";
import { SvgProps } from "react-native-svg";
import JobPostedIcon from "../icons/JobPostedIcon";
import PaidIcon from "../icons/PaidIcon";
import TaskDoneIcon from "../icons/TaskDoneIcon";
import TotalUsersIcon from "../icons/TotalUsersIcon";
import StatisticsCard from "./StatisticsCard";

export type HeroDataType = {
  title: string;
  Icon: React.FC<SvgProps>;
  number: number;
};

const Statistics = () => {
  const { generalData } = useAppSelector((state) => state.settings);
  const heroData: HeroDataType[] = [
    {
      title: "Jobs Posted",
      Icon: JobPostedIcon,
      number: generalData.jobs_count,
    },
    {
      title: "Total User",
      Icon: TotalUsersIcon,
      number: generalData.user_count,
    },
    {
      title: "Task Done",
      Icon: TaskDoneIcon,
      number: generalData.task_count,
    },
    {
      title: "Paid",
      Icon: PaidIcon,
      number: generalData.total_payment,
    },
  ];

  return (
    <View
      style={{
        rowGap: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: -40,
      }}
    >
      {heroData.map((item, index) => (
        <StatisticsCard key={index} item={item} />
      ))}
    </View>
  );
};

export default Statistics;
