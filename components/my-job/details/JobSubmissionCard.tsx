import Badge from "@/components/libs/Badge";
import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import IconButton from "@/components/libs/IconButton";
import { ThemedText } from "@/components/libs/ThemedText";
import useJobReview from "@/hooks/useJobReview";
import { useThemeColor } from "@/hooks/useThemeColor";
import { JobSubmission, TaskStatus } from "@/types/myJobs";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

type Props = {
  data: JobSubmission;
  onSelect: (id: number) => void;
  selectedTaskIds: number[];
};

const JobSubmissionCard = ({ data, onSelect, selectedTaskIds }: Props) => {
  const selected = selectedTaskIds.includes(data.id);
  const checkboxBorderColor = useThemeColor(selected ? "success" : "gray.200");
  const checkboxColor = useThemeColor(selected ? "success" : "gray.500");
  const {
    handleSatisfySignle,
    handleUnSatisfySingle,
    isSinglesatisfying,
    isSingleUnsatisfying,
  } = useJobReview();

  const status = data.status;

  return (
    <Card style={{ padding: 0, rowGap: 0 }}>
      <Card
        darkColor="primarydarker"
        color="primarydark"
        style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {status === TaskStatus.UNDER_REVIEW && (
              <Checkbox
                style={{
                  borderColor: checkboxBorderColor,
                  marginTop: 5,
                }}
                value={selected}
                onValueChange={() => onSelect(data.id)}
                color={selected ? checkboxColor : undefined}
              />
            )}
            {status === TaskStatus.SATISFIED && (
              <IconButton
                icon="happy"
                color="primarydarker"
                darkColor="success"
                size="sm"
              />
            )}
            {status === TaskStatus.UNSATISFIED && (
              <IconButton icon="close" color="error" size="sm" />
            )}
            <View>
              <ThemedText color="white" variant="body2">
                ID: {data.id}
              </ThemedText>
              <ThemedText color="white">
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

        <View
          style={{
            flexDirection: "row",
            gap: 8,
            marginTop: 10,
            justifyContent: "flex-end",
          }}
        >
          <Link href={`/(mainLayout)/my-jobs/job-review/${data.id}`} asChild>
            <Button size="small" title="View" startIcon="eye" />
          </Link>
          {status === TaskStatus.UNDER_REVIEW && (
            <>
              <Button
                size="small"
                style={{ flex: 1 }}
                title="Satisfy"
                startIcon="checkmark"
                color="success"
                onPress={() => handleSatisfySignle(data.id)}
                loading={isSinglesatisfying === data.id}
              />
              <Button
                size="small"
                style={{ flex: 1 }}
                title="Unsatisfy"
                startIcon="close-sharp"
                color="error"
                onPress={() => handleUnSatisfySingle(data.id)}
                loading={isSingleUnsatisfying === data.id}
              />
            </>
          )}
        </View>
      </Card>
    </Card>
  );
};

export default JobSubmissionCard;
