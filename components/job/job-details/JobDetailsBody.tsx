import AppIcon from "@/components/libs/AppIcon";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { config } from "@/config/config";
import { useAppSelector } from "@/hooks/redux";
import { getRemainingDays } from "@/services/timeCalculator";
import { Job, RequiredProofs, Steps } from "@/types/Job";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { View, ViewStyle } from "react-native";
import JobReport from "../common/JobReport";

const JobDetailsBody = ({ job }: { job: Job }) => {
  const { user } = useAppSelector((state) => state.user);
  const containerStyle: ViewStyle = {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    rowGap: 5,
  };

  const thumbnail = config.fileBaseUrl + job.thumbnail_url;
  return (
    <ThemedView color="card" style={containerStyle}>
      <ThemedText variant="body2">{job.title}</ThemedText>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <AppIcon color="warning" size={20}>
          <Ionicons name="time-outline" />
        </AppIcon>
        <ThemedText>{getRemainingDays(job.end_date)}</ThemedText>
      </View>
      <ThemedText>{job.description}</ThemedText>
      <Image
        source={{ uri: thumbnail }}
        style={{ height: 200, width: "100%", borderRadius: 10 }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <AppIcon size={18} color="primarydark">
            <MaterialIcons name="work" />
          </AppIcon>
          <ThemedText>{job.job_code}</ThemedText>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <AppIcon size={18} color="primarydark">
            <MaterialIcons name="category" />
          </AppIcon>
          <ThemedText>
            {job.job_sub_category?.parent_category?.category_name}
          </ThemedText>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <ThemedText style={{ fontWeight: "bold" }}>Instructions:</ThemedText>
        {JSON.parse(job.steps).map((step: Steps, index: number) => (
          <View key={index}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Step {index + 1}:
            </ThemedText>
            <ThemedText>{step.instruction}</ThemedText>
          </View>
        ))}
      </View>

      {user?.id !== job?.provider?.id &&
        user?.verificationStatus === "VERIFIED" && (
          <View style={{ width: "30%", alignSelf: "flex-end" }}>
            <JobReport
              title="Submit a report agains this job"
              type="job"
              jobId={job.id}
              submissionId={null}
            />
          </View>
        )}

      <View>
        <ThemedText style={{ fontWeight: "bold" }}>Reqiured proofs:</ThemedText>
        {JSON.parse(job.required_proofs).map(
          (proof: RequiredProofs, index: number) => (
            <ThemedText key={index}>{proof.description}</ThemedText>
          )
        )}
      </View>
    </ThemedView>
  );
};

export default JobDetailsBody;
