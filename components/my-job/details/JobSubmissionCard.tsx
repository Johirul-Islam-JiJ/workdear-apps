import Badge from "@/components/libs/Badge";
import Card from "@/components/libs/Card";
import { ThemedText } from "@/components/libs/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { JobSubmission, TaskStatus } from "@/types/myJobs";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { View } from "react-native";

const JobSubmissionCard = ({ data }: { data: JobSubmission }) => {
  const [selected, setSelected] = useState(false);
  const checkboxBorderColor = useThemeColor(selected ? "success" : "gray.500");
  const checkboxColor = useThemeColor(selected ? "success" : "gray.500");

  const onChange = () => {
    setSelected(!selected);
  };

  const status = data.status;

  return (
    <Card style={{ padding: 0 }}>
      <Card color="border">
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Checkbox
              style={{
                borderColor: checkboxBorderColor,
                marginTop: 5,
              }}
              value={selected}
              onValueChange={onChange}
              color={selected ? checkboxColor : undefined}
            />
            <View>
              <ThemedText variant="body2">ID: {data.id}</ThemedText>
              <ThemedText>
                {new Date(data.date).toLocaleDateString("en-BN", {
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
          <View>
            <Badge
              style={{ borderRadius: 5 }}
              label={status}
              color={
                status === TaskStatus.SATISFIED
                  ? "success"
                  : status === TaskStatus.UNSATISFIED
                  ? "error"
                  : "border"
              }
            />
          </View>
        </View>
      </Card>
    </Card>
  );
};

export default JobSubmissionCard;
