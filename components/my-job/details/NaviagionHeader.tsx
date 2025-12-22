import Button from "@/components/libs/Button";
import { DropdownMenu } from "@/components/libs/DropdownMenu";
import { ThemedText } from "@/components/libs/ThemedText";
import useJobReview from "@/hooks/useJobReview";
import { TaskStatus } from "@/types/myJobs";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import CompleteJob from "./CompleteJob";
import ExtendDeadline from "./ExtendDeadline";

type Props = {
  setStatus: React.Dispatch<React.SetStateAction<"" | TaskStatus>>;
  selectedTaskIds: number[];
  setSelectedTaskIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const NaviagionHeader = ({
  setStatus,
  selectedTaskIds,
  setSelectedTaskIds,
}: Props) => {
  const {
    handleMultipleSatisfy,
    handleMultipleUnsatisfy,
    isMultipleSatisfing,
    isMultipleUnsatisfing,
    jobSlug,
  } = useJobReview();
  const statusOptions = [
    { id: 1, label: "All", value: "" },
    { id: 3, label: "CORRECT", value: "correct_submissions" },
    { id: 2, label: "INCORRECT", value: "incorrect_submissions" },
    { id: 4, label: "PENDING", value: "UNDER_REVIEW" },
    { id: 5, label: "SATISFIED", value: "SATISFIED" },
    { id: 6, label: "UNSATISFIED", value: "UNSATISFIED" },
  ];

  function onSatisfy() {
    handleMultipleSatisfy(selectedTaskIds, () => setSelectedTaskIds([]));
  }

  function onUnsatisfy() {
    handleMultipleUnsatisfy(selectedTaskIds, () => setSelectedTaskIds([]));
  }

  return (
    <View style={{ rowGap: 8 }}>
      <ThemedText variant="subtitle" style={{ textAlign: "center" }}>
        Submission lists
      </ThemedText>

      <View
        style={{
          flexDirection: "row",
          columnGap: "1%",
          rowGap: 8,
          flexWrap: "wrap",
        }}
      >
        <ExtendDeadline />
        <CompleteJob />
        <Link asChild href={`/(mainLayout)/my-jobs/job/${jobSlug}`}>
          <Button style={{ width: "49%" }} title="View Job" startIcon="eye" />
        </Link>
        <DropdownMenu
          onSelect={(value) => setStatus(value as any)}
          items={statusOptions}
          placeholder="Filter"
          border
          title="Filter by status"
        />
      </View>
      {selectedTaskIds.length > 0 && (
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button
            onPress={onSatisfy}
            loading={isMultipleSatisfing}
            style={{ flex: 1 }}
            title="Satisfy"
            color="success"
          />
          <Button
            onPress={onUnsatisfy}
            loading={isMultipleUnsatisfing}
            style={{ flex: 1 }}
            title="Unsatisfy"
            color="error"
          />
        </View>
      )}
    </View>
  );
};

export default NaviagionHeader;
