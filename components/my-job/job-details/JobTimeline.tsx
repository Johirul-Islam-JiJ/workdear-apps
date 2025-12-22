import AppIcon from "@/components/libs/AppIcon";
import Card from "@/components/libs/Card";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { ColorScheme } from "@/constants/Colors";
import { getRemainingDays } from "@/services/timeCalculator";
import { Job } from "@/types/Job";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

const JobTimeline = ({ job }: { job: Job }) => {
  const list = [
    {
      title: "Submitted",
      date: job.created_at,
      color: "success",
    },
    {
      title: "Job Start",
      date: job.start_date,
      color:
        getRemainingDays(job.start_date, "started") === "started"
          ? "success"
          : "gray.400",
    },
    {
      title: "Job End",
      date: job.end_date,
      color:
        getRemainingDays(job.end_date, "expired") === "expired"
          ? "success"
          : "gray.400",
    },
  ];
  return (
    <Card style={{ rowGap: 30 }}>
      {list.map((item, index) => (
        <View
          key={index}
          style={{ flexDirection: "row", columnGap: 10, position: "relative" }}
        >
          {index !== 0 && (
            <ThemedView
              color={item.color as ColorScheme}
              style={{
                width: 5,
                height: "110%",
                position: "absolute",
                bottom: "90%",
                left: "3.5%",
                zIndex: 1,
              }}
            />
          )}

          <ThemedView
            color={item.color as ColorScheme}
            style={{
              height: 30,
              width: 30,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppIcon size={20} color="white">
              <Ionicons name="checkmark-circle" />
            </AppIcon>
          </ThemedView>

          <View>
            <ThemedText variant="body2">{item.title}</ThemedText>
            <ThemedText color="gray.400">
              {new Date(item.date).toLocaleDateString("en-BN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </ThemedText>
          </View>
        </View>
      ))}

      <ThemedText variant="body2">
        Remaining:{" "}
        {getRemainingDays(
          job.end_date,
          <ThemedText color="warning" style={{ textAlign: "center" }}>
            This job is Expired
          </ThemedText>
        )}
      </ThemedText>
    </Card>
  );
};

export default JobTimeline;
