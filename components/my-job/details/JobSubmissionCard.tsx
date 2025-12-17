import Badge from "@/components/libs/Badge";
import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import { ThemedText } from "@/components/libs/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { JobSubmission, TaskStatus } from "@/types/myJobs";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { View } from "react-native";

const JobSubmissionCard = ({ data }: { data: JobSubmission }) => {
  const [selected, setSelected] = useState(false);
  const checkboxBorderColor = useThemeColor(selected ? "success" : "gray.200");
  const checkboxColor = useThemeColor(selected ? "success" : "gray.500");

  const onChange = () => {
    setSelected(!selected);
  };

  const status = data.status;

  return (
    <Card style={{ padding: 0, rowGap: 0 }}>
      <Card
        color="primarydarker"
        style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
      >
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
      <Card style={{ rowGap: 0 }}>
        <ThemedText variant="body2">Proof</ThemedText>
        <ThemedText>{data.proof_data}</ThemedText>

        <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
          <Button
            size="small"
            style={{ flex: 1 }}
            title="View"
            startIcon="eye"
          />
          <Button
            size="small"
            style={{ flex: 1 }}
            title="Satisfy"
            startIcon="checkmark"
            color="success"
          />
          <Button
            size="small"
            style={{ flex: 1 }}
            title="Unsatisfy"
            startIcon="close-sharp"
            color="error"
          />
        </View>
      </Card>
    </Card>
  );
};

export default JobSubmissionCard;
