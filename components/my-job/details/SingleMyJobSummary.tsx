import AppIcon from "@/components/libs/AppIcon";
import Badge from "@/components/libs/Badge";
import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import Modal from "@/components/libs/Modal";
import { ThemedText } from "@/components/libs/ThemedText";
import SummaryCard, {
  SummaryCardProps,
} from "@/components/my-work/SummaryCard";
import { JobStatus } from "@/types/Job";
import { SingleJobSummary } from "@/types/myJobs";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, ViewStyle } from "react-native";

const SingleMyJobSummary = ({ data }: { data: SingleJobSummary }) => {
  const [showMore, setShowMore] = useState(0);

  const summaryList: SummaryCardProps[] = [
    {
      label: "Total Submissions",
      value: data.total_submission,
      color: "primarydark",
    },
    {
      label: "Satisfied",
      value: data.total_satisfied_count,
      color: "success",
    },
    {
      label: "Unsatisfied",
      value: data.total_unsatisfied_count,
      color: "warning",
    },
    {
      label: "Under Review",
      value: Number(data.remaining_review),
      color: "warning",
    },
    {
      label: "Workers Needed",
      value: data.total_worker_required,
      color: "warning",
    },
    {
      label: "Impressions",
      value: Number(data.impression_count),
      color: "primarydark",
    },
    {
      label: "Clicks",
      value: Number(data.click_count),
      color: "primarydark",
    },
    {
      label: "Got Reports",
      value: data.total_report_count,
      color: "warning",
    },
  ];

  const completionRate = data.total_satisfied_count
    ? ((data.total_satisfied_count / data.total_submission) * 100).toFixed(1)
    : 0;

  const rejectionRate = data.total_unsatisfied_count
    ? ((data.total_unsatisfied_count / data.total_submission) * 100).toFixed(1)
    : 0;

  const summaryWrapper: ViewStyle = {
    marginTop: 10,
    rowGap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: "1.9%",
  };

  const status = data.job_status;
  return (
    <Card>
      <ThemedText variant="body2">{data.title}</ThemedText>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <Badge
          label={status}
          style={{ borderRadius: 5 }}
          color={
            status === JobStatus.APPROVED
              ? "success"
              : [
                  JobStatus.COMPLETED,
                  JobStatus.DRAFT,
                  JobStatus.CLOSED,
                ].includes(status)
              ? "primarymain"
              : "warning"
          }
        />
      </View>
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
      <Button
        size="small"
        title="View Report"
        startIcon="eye"
        onPress={() => setShowMore(1)}
      />

      <Modal visible={showMore} setVisible={setShowMore}>
        <ThemedText variant="subtitle" color="primarydark" darkColor="white">
          Summary of this job
        </ThemedText>
        <View style={summaryWrapper}>
          {summaryList.map((item, index) => (
            <SummaryCard key={index} {...item} style={{ width: "49%" }} />
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <Button title="Close" onPress={() => setShowMore(0)} />
        </View>
      </Modal>
    </Card>
  );
};

export default SingleMyJobSummary;
