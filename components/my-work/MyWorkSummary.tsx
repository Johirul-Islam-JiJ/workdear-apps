import { MyWorkSummaryType } from "@/types/myWork";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import AppIcon from "../libs/AppIcon";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import SummaryCard, { SummaryCardProps } from "./SummaryCard";

const MyWorkSummary = ({ data }: { data: MyWorkSummaryType }) => {
  const totalReview =
    data.total_review > 0
      ? ((data.star_count / data.total_review) * 5).toFixed(1)
      : "0";
  const reviewText = ` (${data.total_review} ${
    data.total_review > 1 ? "reviews" : "review"
  })`;

  const completionRate = data.total_satisfied_task
    ? ((data.total_satisfied_task / data.total_task) * 100).toFixed(1)
    : 0;

  const rejectionRate = data.total_unsatisfied_task
    ? ((data.total_unsatisfied_task / data.total_task) * 100).toFixed(1)
    : 0;

  const summaryList: SummaryCardProps[] = [
    {
      label: "Total Task",
      value: data.total_task,
      color: "primarydark",
    },
    {
      label: "Total Earn",
      value: data.total_earn,
      startContent: "$",
      color: "success",
    },
    {
      label: "Satisfied",
      value: data.total_satisfied_task,
      color: "success",
    },
    {
      label: "Unsatisfied",
      value: data.total_unsatisfied_task,
      color: "error",
    },
    {
      label: "Under Review",
      value: data.under_review_task,
      color: "warning",
    },
    {
      label: "Overall Review",
      value: parseFloat(totalReview),
      endContent: reviewText,
      color: "primarydark",
    },
  ];

  const summaryWrapper: ViewStyle = {
    rowGap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: "1.9%",
  };

  const rateWrapper: ViewStyle = {
    rowGap: 5,
    padding: 10,
    borderRadius: 8,
  };

  return (
    <View style={{ rowGap: 10 }}>
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        Summary of your work
      </ThemedText>
      <View style={summaryWrapper}>
        {summaryList.map((item, index) => (
          <SummaryCard key={index} {...item} style={{ width: "49%" }} />
        ))}
      </View>

      <ThemedView style={rateWrapper} color="card">
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <AppIcon color="success" size={20}>
              <Ionicons name="happy" />
            </AppIcon>
            <ThemedText color="success">Completion Rate</ThemedText>
          </View>
          <ThemedText color="success" style={{ fontWeight: "bold" }}>
            {completionRate}%
          </ThemedText>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <AppIcon color="error" size={22}>
              <Ionicons name="close" />
            </AppIcon>
            <ThemedText color="error">Rejection Rate</ThemedText>
          </View>
          <ThemedText color="error" style={{ fontWeight: "bold" }}>
            {rejectionRate}%
          </ThemedText>
        </View>
      </ThemedView>
    </View>
  );
};

export default MyWorkSummary;
