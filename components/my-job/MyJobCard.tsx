import { getRemainingDays } from "@/services/timeCalculator";
import { JobStatus } from "@/types/Job";
import { MyJob } from "@/types/myJobs";
import React, { useRef, useState } from "react";
import { Animated, Pressable, View } from "react-native";
import Badge from "../libs/Badge";
import Card from "../libs/Card";
import { ThemedText } from "../libs/ThemedText";

const MyJobCard = ({ job }: { job: MyJob }) => {
  const expand = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    Animated.timing(expand, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  // Animated height for content
  const animatedHeight = expand.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 70],
  });

  const dateFmt = (date: string) =>
    new Date(date).toLocaleDateString("en-BN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText variant="bodySemiBold">{job.job_code}</ThemedText>
        <Badge
          label={job.status}
          style={{ borderRadius: 5 }}
          color={
            job.status === JobStatus.APPROVED
              ? "success"
              : [
                  JobStatus.COMPLETED,
                  JobStatus.DRAFT,
                  JobStatus.CLOSED,
                ].includes(job.status)
              ? "primarymain"
              : "warning"
          }
        />
      </View>
      <ThemedText variant="subtitle">{job.title}</ThemedText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Card style={{ flex: 1, rowGap: 0 }} color="primarydarker">
          <ThemedText>Progress</ThemedText>
          <ThemedText variant="body2">
            {job.submission_information.APPROVED}/
            {job.submission_information.REQUIRED_JOB_WORKER}
          </ThemedText>
        </Card>
        <Card style={{ flex: 1, rowGap: 0 }} color="primarydarker">
          <ThemedText>Cost</ThemedText>
          <ThemedText variant="body2">
            $
            {(
              parseFloat(job.pay_per_task) *
              job.submission_information.REQUIRED_JOB_WORKER
            ).toFixed(4)}
          </ThemedText>
        </Card>
      </View>

      {job.status === JobStatus.DRAFT || job.status === JobStatus.PENDING ? (
        <Card color="border">
          <ThemedText style={{ textAlign: "center" }}>
            Not started yet
          </ThemedText>
        </Card>
      ) : (
        <Pressable onPress={toggleExpand}>
          <Card color="border" style={{ flex: 1, rowGap: 0 }}>
            <ThemedText variant="small">
              {expanded ? "Duration" : "Tap for details"}
            </ThemedText>

            {/* Animated content */}
            <Animated.View
              style={{ height: animatedHeight, overflow: "hidden" }}
            >
              <View>
                <ThemedText color="success">
                  Start: {dateFmt(job.start_date)}
                </ThemedText>
                <ThemedText color="warning">
                  End: {dateFmt(job.end_date)}
                </ThemedText>
                <ThemedText>
                  Remaining: {getRemainingDays(job.end_date)}
                </ThemedText>
              </View>
            </Animated.View>

            {!expanded && (
              <ThemedText variant="bodySemiBold">
                {dateFmt(job.start_date)} - {dateFmt(job.end_date)}
              </ThemedText>
            )}
          </Card>
        </Pressable>
      )}
    </Card>
  );
};

export default MyJobCard;
