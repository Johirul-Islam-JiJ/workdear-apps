import AppIcon from "@/components/libs/AppIcon";
import Badge from "@/components/libs/Badge";
import { TextVariant, ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { getRemainingDays } from "@/services/timeCalculator";
import { Job } from "@/types/Job";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";
import JobReportCard, { JobSummaryCardProps } from "./JobReportCard";
import SubmissionRequirement from "./SubmissionRequirement";

const JobInfoCard = ({ job }: { job: Job }) => {
  const jobReports: JobSummaryCardProps[] = [
    {
      label: "Payment",
      value: `$${job.pay_per_task}`,
      Icon: (
        <AppIcon color="success" size={20}>
          <FontAwesome name="dollar" />
        </AppIcon>
      ),
      color: "success",
    },
    {
      label: "Workers",
      value: `${job.submission_information.APPROVED}/${job.total_workers_required}`,
      color: "info",
      Icon: (
        <AppIcon color="info" size={20}>
          <FontAwesome name="users" />
        </AppIcon>
      ),
    },
    {
      label: "Duration",
      value: `${job.estimated_day} days`,
      color: "primarydark",
      Icon: (
        <AppIcon color="primarydark" size={20}>
          <FontAwesome name="clock-o" />
        </AppIcon>
      ),
    },
    {
      label: "Time Left",
      value: getRemainingDays(job.end_date, "Job ended"),
      color: "warning",
      variant: "body1" as TextVariant,
      Icon: (
        <AppIcon color="warning" size={20}>
          <Octicons name="stopwatch" />
        </AppIcon>
      ),
    },
  ];

  const reportWrapper: ViewStyle = {
    rowGap: 5,
    columnGap: "1.9%",
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  };

  return (
    <ThemedView color="card" style={{ padding: 10, borderRadius: 10, gap: 10 }}>
      <View>
        <ThemedText variant="body2">{job.title}</ThemedText>
        <ThemedText variant="small">Job code: {job.job_code}</ThemedText>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Badge
            style={{ borderRadius: 5 }}
            label={job.status}
            color={
              job.status === "APPROVED"
                ? "success"
                : job.status === "EXPIRED"
                ? "warning"
                : job.status === "REJECTED"
                ? "error"
                : "border"
            }
          />
        </View>
        <View style={reportWrapper}>
          {jobReports.map((item, index) => (
            <JobReportCard key={index} {...item} style={{ width: "49%" }} />
          ))}
        </View>
      </View>
      <SubmissionRequirement job={job} />
    </ThemedView>
  );
};

export default JobInfoCard;
