import { MyJobStatistics } from "@/types/myJobs";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import AppIcon from "../libs/AppIcon";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";
import SummaryCard, { SummaryCardProps } from "../my-work/SummaryCard";

const MyJobSummary = ({ data }: { data: MyJobStatistics }) => {
  const summaryList: SummaryCardProps[] = [
    {
      label: "Total Jobs",
      value: data.total_job,
      color: "primarydark",
    },
    {
      label: "Active Jobs",
      value: data.active_jobs,
      color: "success",
    },
    {
      label: "Paused Jobs",
      value: data.inactive_jobs,
      color: "warning",
    },
    {
      label: "Pending Jobs",
      value: data.pending_jobs,
      color: "warning",
    },
    {
      label: "Expired Jobs",
      value: data.expired_jobs,
      color: "warning",
    },
    {
      label: "Job Cost",
      value: data.total_spent,
      color: "primarydark",
    },
    {
      label: "Promotional Cost",
      value: data.total_promotion_cost,
      color: "primarydark",
    },
    {
      label: "Got reports",
      value: data.got_reports,
      color: "warning",
    },
    {
      label: "Total Expected Worker",
      value: parseInt(data.total_expected_worker),
      color: "primarydark",
    },
    {
      label: "Total Applied Worker",
      value: data.got_total_submission,
      color: "primarydark",
    },
    {
      label: "Total Satisfied Worker",
      value: data.total_satisfied_count,
      color: "success",
    },
    {
      label: "Total Unsatisfied Worker",
      value: data.total_unsatisfied_count,
      color: "warning",
    },
  ];

  const completionRate = data.total_satisfied_count
    ? ((data.total_satisfied_count / data.got_total_submission) * 100).toFixed(
        1
      )
    : 0;

  const rejectionRate = data.total_unsatisfied_count
    ? (
        (data.total_unsatisfied_count / data.got_total_submission) *
        100
      ).toFixed(1)
    : 0;

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
        Summary of your jobs
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

export default MyJobSummary;
