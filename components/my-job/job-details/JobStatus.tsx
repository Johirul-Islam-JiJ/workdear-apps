import AppIcon from "@/components/libs/AppIcon";
import Card from "@/components/libs/Card";
import Divider from "@/components/libs/Divider";
import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { Job } from "@/types/Job";
import { Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

const JobStatus = ({ job }: { job: Job }) => {
  const list = [
    {
      title: "Screenshots Required",
      value: parseInt(job.require_screenshots) > 0 ? "Yes" : "No",
    },
    {
      title: "Paused",
      value: parseInt(job.pause) > 0 ? "Yes" : "No",
    },
    {
      title: "Boosted",
      icon: <Ionicons name="rocket" />,
      value: job.is_boosted ? "Yes" : "No",
    },
    {
      title: "Pinned",
      icon: <Entypo name="pin" />,
      value: job.is_pinned ? "Yes" : "No",
    },
  ];

  return (
    <Card>
      {list.map((item, index) => (
        <View key={index}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <ThemedText>{item.title}</ThemedText>
              {item.icon && (
                <AppIcon size={20} color="primarydark">
                  {item.icon}
                </AppIcon>
              )}
            </View>
            <ThemedText color="gray.700" darkColor="gray.300">
              {item.value}
            </ThemedText>
          </View>
          <Divider />
        </View>
      ))}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ThemedText>Available Countries</ThemedText>
        <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
          {job.countries.map((country, index) => (
            <ThemedView
              key={index}
              color="border"
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <ThemedText>{country.short_name}</ThemedText>
            </ThemedView>
          ))}
        </View>
      </View>
    </Card>
  );
};

export default JobStatus;
