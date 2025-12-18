import SummaryCard, {
  SummaryCardProps,
} from "@/components/my-work/SummaryCard";
import { Job } from "@/types/Job";
import React from "react";
import { View, ViewStyle } from "react-native";

const JobperformanceAndStatistics = ({ job }: { job: Job }) => {
  const summaryList: SummaryCardProps[] = [
    {
      label: "Impressions",
      value: job.impression_count,
      color: "primarydark",
    },
    {
      label: "Clicks",
      value: job.click_count,
      color: "success",
    },
  ];

  const summaryWrapper: ViewStyle = {
    marginTop: 10,
    rowGap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: "1.9%",
  };

  return (
    <View style={summaryWrapper}>
      {summaryList.map((item, index) => (
        <SummaryCard key={index} {...item} style={{ width: "49%" }} />
      ))}
    </View>
  );
};

export default JobperformanceAndStatistics;
