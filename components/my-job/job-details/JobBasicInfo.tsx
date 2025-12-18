import Badge from "@/components/libs/Badge";
import Card from "@/components/libs/Card";
import { ThemedText } from "@/components/libs/ThemedText";
import SummaryCard, {
  SummaryCardProps,
} from "@/components/my-work/SummaryCard";
import { config } from "@/config/config";
import { Job, JobStatus } from "@/types/Job";
import { Image } from "expo-image";
import React from "react";
import { View, ViewStyle } from "react-native";

const JobBasicInfo = ({ job }: { job: Job }) => {
  const summaryList: SummaryCardProps[] = [
    {
      label: "Total Budget",
      value: Number(job.pay_per_task) * job.total_workers_required,
      color: "success",
    },
    {
      label: "Workers",
      value: `${job.submission_information.APPROVED} / ${job.total_workers_required}`,
      color: "primarydark",
    },
    {
      label: "Under Review",
      value: job.submission_information.UNDER_REVIEW,
      color: "warning",
    },
    {
      label: "Duration",
      value: job.estimated_day + " days",
      color: "info",
    },
  ];

  const summaryWrapper: ViewStyle = {
    marginTop: 10,
    rowGap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: "1.9%",
  };

  const status = job.status;
  return (
    <Card>
      <View>
        <ThemedText variant="body2">{job.title}</ThemedText>
        <ThemedText>Job Code: {job.job_code}</ThemedText>
        <Badge
          label={status}
          style={{ borderRadius: 5, alignSelf: "flex-start" }}
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
      <Image
        source={{ uri: config.fileBaseUrl + job.thumbnail_url }}
        style={{ width: "100%", height: 200, borderRadius: 10 }}
      />
      <View style={summaryWrapper}>
        {summaryList.map((item, index) => (
          <SummaryCard key={index} {...item} style={{ width: "49%" }} />
        ))}
      </View>
    </Card>
  );
};

export default JobBasicInfo;
