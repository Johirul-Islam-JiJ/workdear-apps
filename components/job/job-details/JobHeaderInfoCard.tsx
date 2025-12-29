import AppIcon from "@/components/libs/AppIcon";
import DonutChat from "@/components/libs/DonutChat";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Job } from "@/types/Job";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { ViewStyle } from "react-native";

const JobHeaderInfoCard = ({ job }: { job: Job }) => {
  const primarydark = useThemeColor("primarydark");
  const { TOTAL_SUBMISSIONS, REQUIRED_JOB_WORKER } = job.submission_information;
  const iconStyle: ViewStyle = {
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 25,
  };

  const cutoutScore = (TOTAL_SUBMISSIONS / REQUIRED_JOB_WORKER) * 100;
  const cutoutDescription = `${TOTAL_SUBMISSIONS} / ${REQUIRED_JOB_WORKER}`;

  return (
    <ThemedView color="card" style={containerStyle}>
      <DonutChat
        segments={[{ value: cutoutScore, color: primarydark }]}
        description={cutoutDescription}
        width={50}
        stockWidth={10}
      />
      <ThemedText variant="body2">${job.pay_per_task}</ThemedText>
      <ThemedView color="primarydark" style={iconStyle}>
        <AppIcon color="white" size={40}>
          <FontAwesome6 name="check" />
        </AppIcon>
      </ThemedView>
    </ThemedView>
  );
};

export default JobHeaderInfoCard;
