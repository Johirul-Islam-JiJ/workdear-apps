import { MyWork, MyWorkStatus } from "@/types/myWork";
import { Link } from "expo-router";
import React from "react";
import { View, ViewStyle } from "react-native";
import JobReport from "../job/common/JobReport";
import Badge from "../libs/Badge";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const MyWorkCard = ({ task }: { task: MyWork }) => {
  const status: MyWorkStatus = task.task.status;

  const rowStyle: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const conainerStyle: ViewStyle = {
    rowGap: 10,
    padding: 10,
    borderRadius: 10,
  };
  const buttonStyle: ViewStyle = {
    flexGrow: 1,
    borderRadius: 6,
  };
  return (
    <ThemedView style={conainerStyle} key={task.task.id}>
      <View>
        <ThemedText
          style={{ fontWeight: "bold" }}
          numberOfLines={2}
          lineBreakMode="tail"
        >
          {task.job.title}
        </ThemedText>
        <ThemedText color="gray.700" variant="small">
          {new Date(task.task.created_at).toLocaleDateString("en-BN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </ThemedText>
      </View>
      <View style={rowStyle}>
        <ThemedText style={{ fontWeight: "bold" }}>
          ${task.job.pay_per_task}
        </ThemedText>
        <Badge
          style={{ borderRadius: 5 }}
          variant="soft"
          label={task.task.status}
          color={
            status === MyWorkStatus.UNDER_REVIEW
              ? "warning"
              : status === MyWorkStatus.SATISFIED
              ? "success"
              : "error"
          }
        />
      </View>

      <View style={[rowStyle, { columnGap: 5 }]}>
        {status !== MyWorkStatus.SATISFIED && (
          <JobReport
            jobId={task.job.id}
            submissionId={null}
            title="Report agains this job"
            type="job"
            style={buttonStyle}
            buttonSize="small"
          />
        )}
        <Link href={`/(mainLayout)/(tabs)/jobs/${task.job.slug}`} asChild>
          <Button style={buttonStyle} title="View Job" size="small" />
        </Link>
        <Link href={`/(mainLayout)/(tabs)/my-work/${task.task.id}`} asChild>
          <Button style={buttonStyle} title="Vew Task" size="small" />
        </Link>
      </View>
    </ThemedView>
  );
};

export default MyWorkCard;
