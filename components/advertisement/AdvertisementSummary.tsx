import { AdvertisementSummary as SummaryType } from "@/types/Advertisement";
import React from "react";
import { View, ViewStyle } from "react-native";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";
import SummaryCard, { SummaryCardProps } from "../my-work/SummaryCard";

const AdvertisementSummary = ({ data }: { data: SummaryType }) => {
  const summaryList: SummaryCardProps[] = [
    {
      label: "Total Ads",
      value: data.total_ads,
      color: "primarydark",
    },
    {
      label: "Active Ads",
      value: data.active_ads,
      color: "success",
    },
    {
      label: "Inactive Ads",
      value: data.inactive_ads,
      color: "error",
    },
    {
      label: "Pending Ads",
      value: data.pending_ads,
      color: "info",
    },
    {
      label: "Expired Ads",
      value: data.expired_ads,
      color: "warning",
    },
    {
      label: "Total Click",
      value: data.total_click,
      color: "primarydark",
    },
    {
      label: "Total Cost",
      value: `$${data.total_cost}`,
      color: "primarydark",
    },
  ];

  const summaryWrapper: ViewStyle = {
    rowGap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: "1.9%",
  };

  return (
    <Card>
      <ThemedText variant="subtitle">Advertisement Report</ThemedText>
      <View style={summaryWrapper}>
        {summaryList.map((item, index) => (
          <SummaryCard key={index} {...item} style={{ width: "49%" }} />
        ))}
      </View>
    </Card>
  );
};

export default AdvertisementSummary;
